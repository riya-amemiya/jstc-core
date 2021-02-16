import acorn from "../../../../type/type"
import { Out, print } from "../../.."
import VariableDeclaration from "./VariableDeclaration"
/**
 * @module functrion
 * @param code
 * @param out
 */
export default (
    code: acorn.Body3,
    out: acorn.OUT,
    conversion: {
        Literal: ( data: string ) => string,
        BinaryExpression: ( data: string[] ) => string,
        Function: ( data: string[] ) => string,
        VariableDeclaration: ( data: [ string, number ] ) => string,
        Kind: {
            let: ( data: string[] ) => string,
            const: ( data: string[] ) => string
        }
    } ): acorn.OUT =>
{
    let argument: { name: string[], out: string } = { name: [], out: "" }
    for ( const params of code.params )
    {
        argument.name.push( params.name )
    }
    for ( let i = 0; i < argument.name.length; i++ )
    {
        let t = ""
        if ( i !== argument.name.length - 1 )
        {
            t = ","
        }
        argument.out += `${ argument.name[ i ] }${ t }`
    }
    for ( const c of code.body.body )
    {
        if ( c.type === "VariableDeclaration" )
        {
            out.cash.code += VariableDeclaration( c, out, { VariableDeclaration: conversion.VariableDeclaration, Kind: conversion.Kind } ).cash.code
        }
        if ( c.type === "ExpressionStatement" )
        {
            out = print( c, out, {
                Literal: conversion.Literal,
                FunIdentifier: ( data: string[] ): string => `print(${ data[ 0 ] }(${ data[ 1 ] }));`,
                Identifier: conversion.Literal,
                BinaryExpression: conversion.BinaryExpression
            } )
            /*if ( c.expression.type === "CallExpression" )
            {
                if ( c.expression.callee.type === "MemberExpression" )
                {
                    if ( c.expression.callee.object.name === "console" )
                    {
                        if ( c.expression.callee.property.name === "log" )
                        {
                            let binary: string[] = [ "" ]
                            if ( c.expression.arguments[ 0 ].type === "Literal" )
                            {
                                //out.cash.code += `print("${c.expression.arguments[0].value}");`
                                out.cash.code += conversion.Literal( `"${ c.expression.arguments[ 0 ].value }"` )
                            }
                            else if ( c.expression.arguments[ 0 ].type === "BinaryExpression" )
                            {
                                ( { out, binary } = Binary( c, out, { BinaryExpression: conversion.BinaryExpression } ) )
                            } else if ( c.expression.arguments[ 0 ].type === "Identifier" )
                            {
                                out.cash.code += conversion.Literal( c.expression.arguments[ 0 ].name )
                            }
                            out.ast.codes.console.push( {
                                call: {
                                    object: c.expression.callee.object.name,
                                    property: c.expression.callee.property.name,
                                    literal: c.expression.arguments[ 0 ]?.value ? `${ c.expression.arguments[ 0 ].value }` : "",
                                    binary: binary[ 0 ] ? `${ binary[ 0 ] }${ binary[ 1 ] }${ binary[ 2 ] }` : ""
                                }
                            } )
                        }
                    }
                }
            }*/
        }
        if ( c.type === "ReturnStatement" )
        {
            if ( c?.argument.type === "BinaryExpression" )
            {
                out.cash.return += `${ c.argument.left.name } ${ c.argument.operator } ${ c.argument.right.name }`
            }
            if ( c.argument.type === "Identifier" )
            {
                out.cash.return += c.argument.name
            }
        }
    }
    //out.code += `def ${ code.id.name }(${ argument.out }): ${ out.cash.code } return ${ out.cash.return }\n`
    out = Out.ast( out, { name: code.id.name, argument: argument.out, body: out.cash.code, return: out.cash.return } )

    out.cash.Function += conversion.Function( [ code.id.name, argument.out, out.cash.code, out.cash.return ] )
    return out
}