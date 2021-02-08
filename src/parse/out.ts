import acron from "../../type/type"
export const Out = {
    clean: (
        {
            code = "",
            ast = {
                Function: [ {
                    name: "",
                    argument: "",
                    body: "",
                    return: ""
                } ]
            },
            cash = {
                code: "",
                return: "",
                Identifier: [
                    {
                        name: "",
                        to: "",
                        value: "",
                        num: 0
                    }
                ],
                Function: ""
            },
            not = [ {
                name: "",
                num: 0
            } ]
        } ): acron.OUT => ( {
            code: code,
            ast: ast,
            cash: cash,
            not: not
        } ),
    cleanCash: ( out: acron.OUT ): acron.OUTCASH =>
    {
        return { code: "", return: "", Identifier: out.cash.Identifier, Function: out.cash.Function }
    },
    ast: ( out: acron.OUT, data: acron.ASTFUNCTION ) =>
    {
        out.ast.Function.push( data )
        return out
    },
    not: ( out: acron.OUT, data: acron.OUTNOT ) =>
    {
        out.not.push( data )
        return out
    }
}
