import acorn from "../../../../type/type"
import { variable } from "../../.."
/**
 * @module VariableDeclaration
 * @param c
 * @param out
 */
export default ( c: acorn.Body, out: acorn.OUT, conversion: { VariableDeclaration: ( data: [ string, number ] ) => string, Kind: { let: ( data: string[] ) => string, const: ( data: string[] ) => string } } ): acorn.CASH =>
{
    if ( c.type === "VariableDeclaration" )
    {
        ( { out } = variable( c, out, { Kind: conversion.Kind } ) )
    }
    return out
}