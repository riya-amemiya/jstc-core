import acorn from '../../../type/type';
import { parse, Out } from '../../index';
export default class Modes
{
    codes: acorn.Node;
    out: acorn.OUT;
    conversion: acorn.CONVERSION
    parse: acorn.OUT;
    option: acorn.OUTOPTION
    mode: string;
    constructor ( { codes, conversion, option, mode }: { codes: acorn.Node; conversion: acorn.CONVERSION; option: acorn.OUTOPTION; mode: string; } )
    {
        this.codes = codes
        this.option = option
        this.mode = mode
        this.out = Out.clean( { mode: this.mode, option: this.option } )
        this.conversion = conversion
        this.parse = parse( { codes: this.codes, out: this.out, conversion: this.conversion } )
    }
};
