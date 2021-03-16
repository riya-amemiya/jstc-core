import acron from '../../type/type';
/**
 * @module Out
 * OUTを操作する関数
 */
export const Out = {
    /**
     *
     * @param param0
     * @returns {acron.OUT} 全て初期化
     */
    clean: ({
        code = '',
        ast = {
            Function: [
                {
                    name: '',
                    argument: '',
                    body: '',
                    return: '',
                },
            ],
            codes: {
                console: [
                    {
                        call: {
                            object: '',
                            property: '',
                            literal: '',
                            binary: '',
                        },
                    },
                ],
            },
        },
        cash = {
            code: '',
            return: '',
            Identifier: [
                {
                    name: '',
                    to: '',
                    value: '',
                    num: 0,
                },
            ],
            Function: '',
            Binary: [
                {
                    name: '',
                    operator: '',
                    value: '',
                },
            ],
        },
        not = [
            {
                name: '',
                num: 0,
            },
        ],
        mode = '',
        option = {
            optimisation: false,
        },
    }): acron.OUT => {
        return {
            code,
            ast,
            cash,
            not,
            mode,
            option,
        };
    },
    /**
     * @param  {acron.OUT} out
     * @returns {acron.OUTCASH} Cashのみ初期化
     */
    cleanCash: (out: acron.OUT): acron.OUTCASH => {
        return {
            code: '',
            return: '',
            Identifier: out.cash.Identifier,
            Function: out.cash.Function,
            Binary: out.cash.Binary,
        };
    },
    /**
     *
     * @param out
     * @param data
     * @returns {acron.OUT} astのみ初期化
     */
    ast: (out: acron.OUT, data: acron.ASTFUNCTION): acron.OUT => {
        out.ast.Function.push(data);
        return out;
    },
    /**
     * @param out
     * @param data
     * @returns {acron.OUT} notのみ初期化
     */
    not: (out: acron.OUT, data: acron.OUTNOT): acron.OUT => {
        out.not.push(data);
        return out;
    },
};
