"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.horizontalEdits = void 0;
const sql_1 = require("../sql");
const atomicEdits_1 = require("./atomicEdits");
const edit_1 = require("./edit");
// ==============
// Horzonal Edits
// ==============
/**
 * The set of horizontal edits, represented as a map, indexed by the edit names.
 */
exports.horizontalEdits = new Map();
// === Asterisk ===
function changeAsteriskTable(x, context) {
    if (!sql_1.Asterisk.isAsterisk(x) || x.table == null)
        return [];
    const res = [];
    for (let f = 0; f < context.query.fromLength; ++f) {
        const fe = context.query.getFrom(f);
        if (fe.alias != x.table) {
            res.push(x.setTable(fe.alias));
        }
    }
    return res;
}
// === ColumnReference ===
function changeColumnReferenceColumn(columnReferences, schema) {
    return (x, context) => {
        if (!sql_1.ColumnReference.isColumnReference(x))
            return [];
        if (!x.table)
            return columnReferences;
        let from = null;
        for (let f = 0; f < context.query.fromLength; ++f) {
            const fe = context.query.getFrom(f);
            if (fe.alias == x.table) {
                from = fe;
                break;
            }
        }
        if (from == null)
            return [];
        const res = [];
        for (let c of columnReferences) {
            if (schema.get(from.table).has(c.column)) {
                res.push(x.setColumn(c.column));
            }
        }
        return res;
    };
}
function changeColumnReferenceTable(x, context) {
    if (!sql_1.ColumnReference.isColumnReference(x) || !x.table)
        return [];
    const res = [];
    for (let f = 0; f < context.query.fromLength; ++f) {
        const fe = context.query.getFrom(f);
        if (fe.alias != x.table) {
            res.push(x.setTable(fe.alias));
        }
    }
    return res;
}
// === Literal ===
function changeLiteralValue(literals) {
    return (x) => sql_1.Literal.isLiteral(x) ? literals : [];
}
// === AggregationFunction ===
function changeAggregationFunctionAggregation(aggregations) {
    return (x) => {
        if (!sql_1.AggregationFunction.isAggregationFunction(x))
            return [];
        const res = [];
        for (let a = 0, n = aggregations.length; a < n; ++a) {
            const aggregation = aggregations[a].aggregation;
            if (aggregation != x.aggregation) {
                res.push(x.setAggregation(aggregation));
            }
        }
        return res;
    };
}
// === BinaryExpression ===
function changeBaseBinaryExpressionOperator(x) {
    if (!sql_1.BinaryExpression.isBinaryExpression(x))
        return [];
    const res = [];
    for (let b = 0, n = sql_1.BinaryExpression.baseBinaryExpressions.length; b < n; ++b) {
        const operator = sql_1.BinaryExpression.baseBinaryExpressions[b].operator;
        if (operator != x.operator) {
            res.push(x.setOperator(operator));
        }
    }
    return res;
}
function swapCommutativeArguments(x, context) {
    if (!sql_1.BinaryExpression.isBinaryExpression(x)
        || !sql_1.BinaryExpression.isCommutative(x.operator)
        || x.left == x.right
        || (x.left && x.left.equals(x.right, context.query, context.query))) {
        return [];
    }
    return [x.setLeft(x.right).setRight(x.left)];
}
function swapAssociativeNesting(x, context) {
    if (!sql_1.BinaryExpression.isBinaryExpression(x)
        || !sql_1.BinaryExpression.isAssiciative(x.operator)) {
        return [];
    }
    const res = [];
    if (sql_1.BinaryExpression.isBinaryExpression(x.left)
        && x.left.operator == x.operator
        && (x.right == null || context.maxHeight.minDiff(x.right.height) >= context.stack.length + 2)) { //TODO: +1, +2, or +0?
        res.push(x.left.setRight(x.setLeft(x.left.right)));
    }
    if (sql_1.BinaryExpression.isBinaryExpression(x.right)
        && x.right.operator == x.operator
        && (x.left == null || context.maxHeight.minDiff(x.left.height) >= context.stack.length + 2)) {
        res.push(x.right.setLeft(x.setRight(x.right.left)));
    }
    return res;
}
function mirrorInequation(x, context) {
    if (!sql_1.BinaryExpression.isBinaryExpression(x)
        || !(x.operator == sql_1.OperatorType.LESS || x.operator == sql_1.OperatorType.GREATER)
        || x.left == x.right
        || (x.left && x.left.equals(x.right, context.query, context.query))) {
        return [];
    }
    return [x.setLeft(x.right).setRight(x.left).setOperator((x.operator == sql_1.OperatorType.LESS) ? sql_1.OperatorType.GREATER : sql_1.OperatorType.LESS)];
}
// === SELECT ===
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "swapSelectElements",
    description: "Elemente in der SELECT-Klausel vertauschen. [[Swap elements]]",
    cost: 1,
    perform: (query, _schema, _meta, result) => {
        if (query.selectLength < 2)
            return;
        const select = query.copySelect();
        for (let s = 1, n = select.length; s < n; ++s) {
            const select1 = select[s - 1], select2 = select[s];
            if (select1 == select2 || (select1 && select1.equals(select2, query, query)))
                continue;
            select[s] = select1;
            select[s - 1] = select2;
            result.push(query.setSelect(select));
            select[s - 1] = select1;
            select[s] = select2;
        }
        // (function generate(k: number) {
        //     if(k==1) result.push(query.setSelect(select));
        //     else {
        //         generate(k-1);
        //         for(let i=0; i<k-1; ++i) {
        //             const j = (k%2==0) ? i : 0;
        //             const tmp = select[j];
        //             select[j] = select[k-1];
        //             select[k-1] = tmp;
        //             generate(k-1);
        //         }
        //     }
        // })(select.length);
        // result.shift();
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "changeSelectAsteriskTable",
    description: "Falschen Tabellennamen für einen Asterisk in einem Select-Element-Ausdruck ändern. [[Change (incorrect)]]",
    cost: atomicEdits_1.atomicEdits.get("setSelectAsteriskTable").cost,
    perform: (query, _schema, meta, result) => {
        (0, atomicEdits_1.replaceSelectExpression)(query, result, changeAsteriskTable, meta.select.length, 1);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "changeSelectColumnReferenceColumn",
    description: "Falsche Spalte in einer Spaltenreferenz eines Select-Element-Ausdrucks ändern. [[Change (incorrect)]]",
    cost: atomicEdits_1.atomicEdits.get("addSelectColumnReference").cost,
    perform: (query, schema, meta, result) => {
        (0, atomicEdits_1.replaceSelectExpression)(query, result, changeColumnReferenceColumn(meta.select.columns, schema), meta.select.length, meta.select.columnReferenceHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "changeSelectColumnReferenceTable",
    description: "Falsche Tabelle in einer Spaltenreferenz eines Select-Element-Ausdrucks ändern. [[Change (incorrect)]]",
    cost: atomicEdits_1.atomicEdits.get("setSelectColumnReferenceTable").cost,
    perform: (query, _schema, meta, result) => {
        (0, atomicEdits_1.replaceSelectExpression)(query, result, changeColumnReferenceTable, meta.select.length, meta.select.columnReferenceHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "changeSelectLiteralValue",
    description: "Falschen Literalwert in einem Select-Element-Ausdruck ändern. [[Change (incorrect)]]",
    cost: atomicEdits_1.atomicEdits.get("addSelectLiteral").cost,
    perform: (query, schema, meta, result) => {
        (0, atomicEdits_1.replaceSelectExpression)(query, result, changeLiteralValue(meta.select.literals), meta.select.length, meta.select.literalHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "changeSelectAggregationFunctionAggregation",
    description: "Falsche Aggregationsfunktion in einem Select-Element-Ausdruck ändern. [[Change (incorrect)]]",
    cost: atomicEdits_1.atomicEdits.get("addSelectAggregationFunction").cost,
    perform: (query, _schema, meta, result) => {
        (0, atomicEdits_1.replaceSelectExpression)(query, result, changeAggregationFunctionAggregation(meta.select.aggregations), meta.select.length, meta.select.aggregationHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "changeSelectBinaryExpressionOperator",
    description: "Falschen Operator in einem binären Ausdruck eines Select-Element-Ausdrucks ändern. [[Change (incorrect)]]",
    cost: atomicEdits_1.atomicEdits.get("addSelectBinaryExpression").cost,
    perform: (query, _schema, meta, result) => {
        (0, atomicEdits_1.replaceSelectExpression)(query, result, changeBaseBinaryExpressionOperator, meta.select.length, meta.select.binaryExpressionHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "swapSelectBinaryExpressionArguments",
    description: "Argumente eines kommutativen binären Ausdrucks in einem Select-Element-Ausdruck vertauschen. [[Swap arguments of]]",
    cost: 0,
    perform: (query, _schema, meta, result) => {
        (0, atomicEdits_1.replaceSelectExpression)(query, result, swapCommutativeArguments, meta.select.length, meta.select.binaryExpressionHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "swapSelectBinaryExpressionNesting",
    description: "Verschachtelung eines assoziativen binären Ausdrucks in einem Select-Element-Ausdruck vertauschen. [[Swap nesting of]]",
    cost: 0,
    perform: (query, _schema, meta, result) => {
        (0, atomicEdits_1.replaceSelectExpression)(query, result, swapAssociativeNesting, meta.select.length, meta.select.binaryExpressionHeight, meta.select);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "mirrorSelectBinaryExpressionInequation",
    description: "Ungleichung in einem Select-Element-Ausdruck umkehren. [[Mirror]]",
    cost: 0,
    perform: (query, _schema, meta, result) => {
        (0, atomicEdits_1.replaceSelectExpression)(query, result, mirrorInequation, meta.select.length, meta.select.binaryExpressionHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "changeSelectAlias",
    description: "Falschen expliziten Alias eines Select-Elements ändern. [[Change (incorrect)]]",
    cost: atomicEdits_1.atomicEdits.get("setSelectAlias").cost,
    perform: (query, _schema, meta, result) => {
        if (!meta.select.as.length)
            return;
        for (let s = 0; s < query.selectLength && s < meta.select.length; ++s) {
            const se = query.getSelect(s);
            if (se.as == null)
                continue;
            for (let a = 0, n = meta.select.as.length; a < n; ++a) {
                const as = meta.select.as[a];
                if (as != se.as) {
                    result.push(query.setSelectElement(s, se.setAs(as)));
                }
            }
        }
    }
});
// === FROM ===
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "swapFromElements",
    description: "Elemente in der FROM-Klausel vertauschen. [[Swap elements]]",
    cost: 0,
    perform: (query, _schema, _meta, result) => {
        //TODO: further research needed about when swapping from elements is equivalence transform
        if (query.fromLength < 2)
            return;
        const from = query.copyFrom();
        for (let f = 1, n = from.length; f < n; ++f) {
            const from1 = from[f - 1], from2 = from[f];
            if (from1 == from2 || (from1 && from1.equals(from2, query, query))
                || from1.join != null
                || from2.join == sql_1.JoinType.LEFT_OUTER
                || from2.join == sql_1.JoinType.RIGHT_OUTER) {
                continue;
            }
            from[f] = (from2.join != null) ? from1.setJoin(from2.join).setOn(from2.on) : from1;
            from[f - 1] = (from2.join != null) ? from2.setJoin(null).setOn(null) : from2;
            result.push(query.setFrom(from));
            from[f - 1] = from1;
            from[f] = from2;
        }
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "changeFromJoinType",
    description: "Falschen Join-Typ eines FROM-Elements ändern. [[Change (incorrect)]]",
    cost: atomicEdits_1.atomicEdits.get("setTableJoinType").cost,
    perform: (query, _schema, meta, result) => {
        if (!meta.from.join)
            return;
        //start at second element because first cannot have complex join
        for (let f = 1; f < query.fromLength; ++f) {
            const from = query.getFrom(f);
            if (from.join == null)
                continue;
            for (let item in sql_1.JoinType) {
                if (isNaN(Number(item))) {
                    result.push(query.setFromElement(f, from.setJoin(sql_1.JoinType[item])));
                }
            }
        }
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "changeFromColumnReferenceColumn",
    description: "Falsche Spalte in einer Spaltenreferenz der Join-Bedingung eines FROM-Elements ändern. [[Change (incorrect)]]",
    cost: atomicEdits_1.atomicEdits.get("addFromColumnReference").cost,
    perform: (query, schema, meta, result) => {
        (0, atomicEdits_1.replaceFromExpression)(query, result, changeColumnReferenceColumn(meta.from.columns, schema), meta.from.columnReferenceHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "changeFromColumnReferenceTable",
    description: "Falsche Tabelle in einer Spaltenreferenz der Join-Bedingung eines FROM-Elements ändern. [[Change (incorrect)]]",
    cost: atomicEdits_1.atomicEdits.get("setFromColumnReferenceTable").cost,
    perform: (query, _schema, meta, result) => {
        (0, atomicEdits_1.replaceFromExpression)(query, result, changeColumnReferenceTable, meta.from.columnReferenceHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "changeFromLiteralValue",
    description: "Falschen Literalwert in der Join-Bedingung eines FROM-Elements ändern. [[Change (incorrect)]]",
    cost: atomicEdits_1.atomicEdits.get("addFromLiteral").cost,
    perform: (query, schema, meta, result) => {
        (0, atomicEdits_1.replaceFromExpression)(query, result, changeLiteralValue(meta.from.literals), meta.from.literalHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "changeFromBinaryExpressionOperator",
    description: "Falschen Operator in einem binären Ausdruck der Join-Bedingung eines FROM-Elements ändern. [[Change (incorrect)]]",
    cost: atomicEdits_1.atomicEdits.get("addFromBinaryExpression").cost,
    perform: (query, _schema, meta, result) => {
        (0, atomicEdits_1.replaceFromExpression)(query, result, changeBaseBinaryExpressionOperator, meta.from.binaryExpressionHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "swapFromBinaryExpressionArguments",
    description: "Argumente eines kommutativen binären Ausdrucks in der Join-Bedingung eines FROM-Elements vertauschen. [[Swap arguments of]]",
    cost: 0,
    perform: (query, _schema, meta, result) => {
        (0, atomicEdits_1.replaceFromExpression)(query, result, swapCommutativeArguments, meta.from.binaryExpressionHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "swapFromBinaryExpressionNesting",
    description: "Verschachtelung eines assoziativen binären Ausdrucks in der Join-Bedingung eines FROM-Elements vertauschen. [[Swap nesting of]]",
    cost: 0,
    perform: (query, _schema, meta, result) => {
        (0, atomicEdits_1.replaceFromExpression)(query, result, swapAssociativeNesting, meta.from.binaryExpressionHeight, false, false, meta.from);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "mirrorFromBinaryExpressionInequation",
    description: "Seiten eines Vergleichs in der Join-Bedingung eines FROM-Elements vertauschen. [[Mirror]]",
    cost: 0,
    perform: (query, _schema, meta, result) => {
        (0, atomicEdits_1.replaceFromExpression)(query, result, mirrorInequation, meta.from.binaryExpressionHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "changeFromAlias",
    description: "Falschen expliziten Alias eines FROM-Elements ändern. [[Change (incorrect)]]",
    cost: atomicEdits_1.atomicEdits.get("setSelectAlias").cost,
    perform: (query, schema, _meta, result) => {
        for (let f = 0; f < query.fromLength; ++f) {
            const fe = query.getFrom(f);
            if (fe.as == null || !schema.has(fe.table))
                continue;
            let as = schema.get(fe.table).name.charAt(0);
            let asNr = 0;
            for (let exists = true; exists; asNr++) {
                exists = false;
                for (let f2 = 0; f2 < query.fromLength; ++f2) {
                    if (query.getFrom(f2).as == (as + asNr)) {
                        exists = true;
                        break;
                    }
                }
            }
            result.push(query.setFromElement(f, fe.setAs(as + asNr)));
        }
    }
});
// === WHERE ===
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "changeWhereColumnReferenceColumn",
    description: "Falsche Spalte in einer Spaltenreferenz der WHERE-Klausel ändern. [[Change (incorrect)]]",
    cost: atomicEdits_1.atomicEdits.get("addWhereColumnReference").cost,
    perform: (query, schema, meta, result) => {
        (0, atomicEdits_1.replaceWhereExpression)(query, result, changeColumnReferenceColumn(meta.where.columns, schema), meta.where.columnReferenceHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "changeWhereColumnReferenceTable",
    description: "Falsche Tabelle in einer Spaltenreferenz der WHERE-Klausel ändern. [[Change (incorrect)]]",
    cost: atomicEdits_1.atomicEdits.get("setWhereColumnReferenceTable").cost,
    perform: (query, _schema, meta, result) => {
        (0, atomicEdits_1.replaceWhereExpression)(query, result, changeColumnReferenceTable, meta.where.columnReferenceHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "changeWhereLiteralValue",
    description: "Falschen Literalwert in der WHERE-Klausel ändern. [[Change (incorrect)]]",
    cost: atomicEdits_1.atomicEdits.get("addWhereLiteral").cost,
    perform: (query, schema, meta, result) => {
        (0, atomicEdits_1.replaceWhereExpression)(query, result, changeLiteralValue(meta.where.literals), meta.where.literalHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "changeWhereBinaryExpressionOperator",
    description: "Falschen Operator in einem binären Ausdruck der WHERE-Klausel ändern. [[Change (incorrect)]]",
    cost: atomicEdits_1.atomicEdits.get("addWhereBinaryExpression").cost,
    perform: (query, _schema, meta, result) => {
        (0, atomicEdits_1.replaceWhereExpression)(query, result, changeBaseBinaryExpressionOperator, meta.where.binaryExpressionHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "swapWhereBinaryExpressionArguments",
    description: "Argumente eines kommutativen binären Ausdrucks in der WHERE-Klausel vertauschen. [[Swap arguments of]]",
    cost: 0,
    perform: (query, _schema, meta, result) => {
        (0, atomicEdits_1.replaceWhereExpression)(query, result, swapCommutativeArguments, meta.where.binaryExpressionHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "swapWhereBinaryExpressionNesting",
    description: "Verschachtelung eines assoziativen binären Ausdrucks in der WHERE-Klausel vertauschen. [[Swap nesting of]]",
    cost: 0,
    perform: (query, _schema, meta, result) => {
        (0, atomicEdits_1.replaceWhereExpression)(query, result, swapAssociativeNesting, meta.where.binaryExpressionHeight, meta.where);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "mirrorWhereBinaryExpressionInequation",
    description: "Seiten eines Vergleichs in der WHERE-Klausel vertauschen. [[Mirror]]",
    cost: 0,
    perform: (query, _schema, meta, result) => {
        (0, atomicEdits_1.replaceWhereExpression)(query, result, mirrorInequation, meta.where.binaryExpressionHeight);
    }
});
// === GROUP BY ===
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "swapGroupbyElements",
    description: "Elemente in der GROUP-BY-Klausel vertauschen. [[Swap elements]]",
    cost: 0,
    perform: (query, _schema, _meta, result) => {
        if (query.groupbyLength < 2)
            return;
        const groupby = query.copyGroupby();
        for (let g = 1, n = groupby.length; g < n; ++g) {
            const g1 = groupby[g - 1], g2 = groupby[g];
            if (g1 == g2 || (g1 && g1.equals(g2, query, query)))
                continue;
            groupby[g] = g1;
            groupby[g - 1] = g2;
            result.push(query.setGroupby(groupby));
            groupby[g - 1] = g1;
            groupby[g] = g2;
        }
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "changeGroupbyColumnReferenceColumn",
    description: "Falsche Spalte in einer Spaltenreferenz eines GROUP-BY-Ausdrucks ändern. [[Change (incorrect)]]",
    cost: atomicEdits_1.atomicEdits.get("addGroupbyColumnReference").cost,
    perform: (query, schema, meta, result) => {
        (0, atomicEdits_1.replaceGroupbyExpression)(query, result, changeColumnReferenceColumn(meta.groupby.columns, schema), meta.groupby.columnReferenceHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "changeGroupbyColumnReferenceTable",
    description: "Falsche Tabelle in einer Spaltenreferenz eines GROUP-BY-Ausdrucks ändern. [[Change (incorrect)]]",
    cost: atomicEdits_1.atomicEdits.get("setGroupbyColumnReferenceTable").cost,
    perform: (query, _schema, meta, result) => {
        (0, atomicEdits_1.replaceGroupbyExpression)(query, result, changeColumnReferenceTable, meta.groupby.columnReferenceHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "changeGroupbyLiteralValue",
    description: "Falschen Literalwert in einem GROUP-BY-Ausdruck ändern. [[Change (incorrect)]]",
    cost: atomicEdits_1.atomicEdits.get("addGroupbyLiteral").cost,
    perform: (query, schema, meta, result) => {
        (0, atomicEdits_1.replaceGroupbyExpression)(query, result, changeLiteralValue(meta.groupby.literals), meta.groupby.literalHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "changeGroupbyBinaryExpressionOperator",
    description: "Falschen Operator in einem binären Ausdruck eines GROUP-BY-Ausdrucks ändern. [[Change (incorrect)]]",
    cost: atomicEdits_1.atomicEdits.get("addGroupbyBinaryExpression").cost,
    perform: (query, _schema, meta, result) => {
        (0, atomicEdits_1.replaceGroupbyExpression)(query, result, changeBaseBinaryExpressionOperator, meta.groupby.binaryExpressionHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "swapGroupbyBinaryExpressionArguments",
    description: "Argumente eines kommutativen binären Ausdrucks in einem GROUP-BY-Ausdruck vertauschen. [[Swap arguments of]]",
    cost: 0,
    perform: (query, _schema, meta, result) => {
        (0, atomicEdits_1.replaceGroupbyExpression)(query, result, swapCommutativeArguments, meta.groupby.binaryExpressionHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "swapGroupbyBinaryExpressionNesting",
    description: "Verschachtelung eines assoziativen binären Ausdrucks in einem GROUP-BY-Ausdruck vertauschen. [[Swap nesting of]]",
    cost: 0,
    perform: (query, _schema, meta, result) => {
        (0, atomicEdits_1.replaceGroupbyExpression)(query, result, swapAssociativeNesting, meta.groupby.binaryExpressionHeight, meta.groupby);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "mirrorGroupbyBinaryExpressionInequation",
    description: "Ungleichung in einem GROUP-BY-Ausdruck spiegeln. [[Mirror]]",
    cost: 0,
    perform: (query, _schema, meta, result) => {
        (0, atomicEdits_1.replaceGroupbyExpression)(query, result, mirrorInequation, meta.groupby.binaryExpressionHeight);
    }
});
// === Having ===
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "changeHavingColumnReferenceColumn",
    description: "Falsch referenzierte Spalte in der HAVING-Klausel ändern. [[Change (incorrect)]]",
    cost: atomicEdits_1.atomicEdits.get("addHavingColumnReference").cost,
    perform: (query, schema, meta, result) => {
        (0, atomicEdits_1.replaceHavingExpression)(query, result, changeColumnReferenceColumn(meta.having.columns, schema), meta.having.columnReferenceHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "changeHavingColumnReferenceTable",
    description: "Falsch referenzierte Tabelle in der HAVING-Klausel ändern. [[Change (incorrect)]]",
    cost: atomicEdits_1.atomicEdits.get("setHavingColumnReferenceTable").cost,
    perform: (query, _schema, meta, result) => {
        (0, atomicEdits_1.replaceHavingExpression)(query, result, changeColumnReferenceTable, meta.having.columnReferenceHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "changeHavingLiteralValue",
    description: "Falschen Literalwert in der HAVING-Klausel ändern. [[Change (incorrect)]]",
    cost: atomicEdits_1.atomicEdits.get("addHavingLiteral").cost,
    perform: (query, schema, meta, result) => {
        (0, atomicEdits_1.replaceHavingExpression)(query, result, changeLiteralValue(meta.having.literals), meta.having.literalHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "changeHavingAggregationFunctionAggregation",
    description: "Falsche Aggregationsfunktion in der HAVING-Klausel ändern. [[Change (incorrect)]]",
    cost: atomicEdits_1.atomicEdits.get("addHavingAggregationFunction").cost,
    perform: (query, _schema, meta, result) => {
        (0, atomicEdits_1.replaceHavingExpression)(query, result, changeAggregationFunctionAggregation(meta.having.aggregations), meta.having.aggregationHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "changeHavingBinaryExpressionOperator",
    description: "Falschen Operator in einem binären Ausdruck der HAVING-Klausel ändern. [[Change (incorrect)]]",
    cost: atomicEdits_1.atomicEdits.get("addHavingBinaryExpression").cost,
    perform: (query, _schema, meta, result) => {
        (0, atomicEdits_1.replaceHavingExpression)(query, result, changeBaseBinaryExpressionOperator, meta.having.binaryExpressionHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "swapHavingBinaryExpressionArguments",
    description: "Argumente eines kommutativen binären Ausdrucks in der HAVING-Klausel vertauschen. [[Swap arguments of]]",
    cost: 0,
    perform: (query, _schema, meta, result) => {
        (0, atomicEdits_1.replaceHavingExpression)(query, result, swapCommutativeArguments, meta.having.binaryExpressionHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "swapHavingBinaryExpressionNesting",
    description: "Verschachtelung eines assoziativen binären Ausdrucks in der HAVING-Klausel vertauschen. [[Swap nesting of]]",
    cost: 0,
    perform: (query, _schema, meta, result) => {
        (0, atomicEdits_1.replaceHavingExpression)(query, result, swapAssociativeNesting, meta.having.binaryExpressionHeight, meta.having);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "mirrorHavingBinaryExpressionInequation",
    description: "Ungleichung in der HAVING-Klausel spiegeln. [[Mirror]]",
    cost: 0,
    perform: (query, _schema, meta, result) => {
        (0, atomicEdits_1.replaceHavingExpression)(query, result, mirrorInequation, meta.having.binaryExpressionHeight);
    }
});
// === Order By ===
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "changeOrderbyElements",
    description: "Position der Elemente in der ORDER-BY-Klausel ändern. [[Change positions]]",
    cost: atomicEdits_1.atomicEdits.get("addOrderbyElement").cost,
    perform: (query, _schema, _meta, result) => {
        if (query.orderbyLength < 2)
            return;
        const orderby = query.copyOrderby();
        for (let o = 1, n = orderby.length; o < n; ++o) {
            const o1 = orderby[o - 1], o2 = orderby[o];
            if (o1 == o2 || (o1 && o1.equals(o2, query, query)))
                continue;
            orderby[o] = o1;
            orderby[o - 1] = o2;
            result.push(query.setOrderby(orderby));
            orderby[o - 1] = o1;
            orderby[o] = o2;
        }
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "changeOrderbyColumnReferenceColumn",
    description: "Falsch referenzierte Spalte in einem ORDER-BY-Ausdruck ändern. [[Change (incorrect)]]",
    cost: atomicEdits_1.atomicEdits.get("addOrderbyColumnReference").cost,
    perform: (query, schema, meta, result) => {
        (0, atomicEdits_1.replaceOrderbyExpression)(query, result, changeColumnReferenceColumn(meta.orderby.columns, schema), meta.orderby.columnReferenceHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "changeOrderbyColumnReferenceTable",
    description: "Falsch referenzierte Tabelle in einem ORDER-BY-Ausdruck ändern. [[Change (incorrect)]]",
    cost: atomicEdits_1.atomicEdits.get("setOrderbyColumnReferenceTable").cost,
    perform: (query, _schema, meta, result) => {
        (0, atomicEdits_1.replaceOrderbyExpression)(query, result, changeColumnReferenceTable, meta.orderby.columnReferenceHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "changeOrderbyLiteralValue",
    description: "Falschen Literalwert in einem ORDER-BY-Ausdruck ändern. [[Change (incorrect)]]",
    cost: atomicEdits_1.atomicEdits.get("addOrderbyLiteral").cost,
    perform: (query, schema, meta, result) => {
        (0, atomicEdits_1.replaceOrderbyExpression)(query, result, changeLiteralValue(meta.orderby.literals), meta.orderby.literalHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "changeOrderbyAggregationFunctionAggregation",
    description: "Falsche Aggregationsfunktion in einem ORDER-BY-Ausdruck ändern. [[Change (incorrect)]]",
    cost: atomicEdits_1.atomicEdits.get("addOrderbyAggregationFunction").cost,
    perform: (query, _schema, meta, result) => {
        (0, atomicEdits_1.replaceOrderbyExpression)(query, result, changeAggregationFunctionAggregation(meta.orderby.aggregations), meta.orderby.aggregationHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "changeOrderbyBinaryExpressionOperator",
    description: "Falschen Operator in einem binären Ausdruck eines ORDER-BY-Ausdrucks ändern. [[Change (incorrect)]]",
    cost: atomicEdits_1.atomicEdits.get("addOrderbyBinaryExpression").cost,
    perform: (query, _schema, meta, result) => {
        (0, atomicEdits_1.replaceOrderbyExpression)(query, result, changeBaseBinaryExpressionOperator, meta.orderby.binaryExpressionHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "swapOrderbyBinaryExpressionArguments",
    description: "Argumente eines kommutativen binären Ausdrucks in einem ORDER-BY-Ausdruck vertauschen. [[Swap arguments of]]",
    cost: 0,
    perform: (query, _schema, meta, result) => {
        (0, atomicEdits_1.replaceOrderbyExpression)(query, result, swapCommutativeArguments, meta.orderby.binaryExpressionHeight);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "swapOrderbyBinaryExpressionNesting",
    description: "Verschachtelung eines assoziativen binären Ausdrucks in einem ORDER-BY-Ausdruck vertauschen. [[Swap nesting of]]",
    cost: 0,
    perform: (query, _schema, meta, result) => {
        (0, atomicEdits_1.replaceOrderbyExpression)(query, result, swapAssociativeNesting, meta.orderby.binaryExpressionHeight, meta.orderby);
    }
});
(0, edit_1.addEdit)(exports.horizontalEdits, {
    name: "mirrorOrderbyBinaryExpressionInequation",
    description: "Ungleichung in einem ORDER-BY-Ausdruck spiegeln. [[Mirror]]",
    cost: 0,
    perform: (query, _schema, meta, result) => {
        (0, atomicEdits_1.replaceOrderbyExpression)(query, result, mirrorInequation, meta.orderby.binaryExpressionHeight);
    }
});
//# sourceMappingURL=horizontalEdits.js.map