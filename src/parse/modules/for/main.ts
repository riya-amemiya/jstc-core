import acorn from "../../../../type/type"
import { Out } from '../../out';
import { variable } from '../../../index';
export default (
    code: acorn.Body3 | acorn.Body,
    out: acorn.OUT,
    conversion: {
        For: ( data: string[] ) => string
        Kind: {
            let: ( data: string[] ) => string
            const: ( data: string[] ) => string
        }
    }
): acorn.OUT =>
{
    out.cash = Out.cleanCash( out )
    if ( code.declarations[ 0 ].type == "VariableDeclarator" )
    {
        out = variable( code, out, { Kind: conversion.Kind } )
    }
    out.code += conversion.For( [ out.cash.code ] )
    return out
}