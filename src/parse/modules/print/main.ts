import acorn from "../../../../type/type"
import chalk from "chalk"
import { Out, Binary } from '../../..';

/**
 * @module print
 * @param code
 * @param out
 */
export default (
    code: acorn.Body3 | acorn.Body,
    out: acorn.OUT,
    conversion: {
        Literal: ( data: string ) => string,
        FunIdentifier: ( data: string[] ) => string,
        Identifier: ( data: string ) => string,
        BinaryExpression: ( data: string[] ) => string
    }
): acorn.OUT =>
{
    if ( code.expression.type === "CallExpression" )
    {
        if ( code.expression.callee.type == "Identifier" )
        {
            let has = { name: out.ast.Function.findIndex( n => n.name === code.expression.callee.name ) }
            let comment = ""
            if ( has.name === -1 )
            {
                if ( out.not.findIndex( n => n.name === code.expression.callee.name ) === -1 && out.ast.Function.findIndex( n => n.name === code.expression.callee.name ) === -1 )
                {
                    if ( out.not.findIndex( n => n.num < 1 ) !== -1 )
                    {
                        out = Out.not( out, { name: code.expression.callee.name, num: 0 } )
                        console.log( chalk.red( `警告:${ code.expression.callee.name }は宣言されていません!` ) );
                        out.not[ out.not.findIndex( n => n.name === code.expression.callee.name ) ].num++
                        if ( out.mode == "python" || out.mode == "ruby" )
                        {
                            comment = `#警告:${ code.expression.callee.name }は宣言されていません!`
                        }
                    }
                }
            }
            out.cash.code = ""
            for ( const c of code.expression.arguments )
            {
                out.cash.code += `${ c.raw },`
            }
            out.cash.code += `${ code.expression.callee.name }(${ out.cash.code.slice( 0, -1 ) })${ comment }\n`
        }
        if ( code.expression.callee.type === "MemberExpression" )
        {
            if ( code.expression.callee.object.name === "console" )
            {
                if ( code.expression.callee.property.name === "log" )
                {
                    for ( const argument of code.expression.arguments )
                    {
                        if ( argument.type === "Literal" )
                        {
                            out.cash.code += conversion.Literal( `${ argument.raw }` )
                        }
                        if ( argument.type === "CallExpression" )
                        {
                            if ( argument.callee.type === "Identifier" )
                            {
                                let _argument: { name: string[], out: string } = { name: [], out: "" }
                                for ( const params of argument.arguments )
                                {
                                    _argument.name.push( params.raw )
                                }
                                for ( let i = 0; i < _argument.name.length; i++ )
                                {
                                    let t = ""
                                    if ( i !== _argument.name.length - 1 )
                                    {
                                        t = ","
                                    }
                                    _argument.out += `${ _argument.name[ i ] }${ t }`
                                }
                                out.cash.code += conversion.FunIdentifier( [ argument.callee.name, _argument.out ] )
                            }
                        }
                        if ( argument?.type === "Identifier" )
                        {
                            if ( out.cash.Identifier.findIndex( n => n.name === argument.name ) !== -1 )
                            {
                                if ( out.cash.Identifier.findIndex( n => n.to === argument.name ) === -1 )
                                {
                                    out.cash.code += conversion.Identifier( argument.name.toUpperCase() )
                                }
                                else
                                {
                                    out.cash.Identifier.push( { name: `_${ argument.name }`, to: `_${ argument.name }`, value: String( argument.value ), num: 0 } )
                                    out.cash.code += conversion.Identifier( `_${ argument.name }` )
                                }
                            }
                            else
                            {
                                out.cash.code += conversion.Identifier( argument.name )
                                // out.cash.Identifier.push( { name: `_${ argument.name }`, to: `_${ argument.name }`, value: String( argument.value ), num: 0 } )
                                // out.cash.code += conversion.Identifier( `_${ argument.name }` )
                            }
                        }
                        if ( argument?.type === "MemberExpression" )
                        {
                            out.cash.code += conversion.Identifier( `${ argument.object.name }[${ argument.property?.raw || `"${ argument.property?.name }"` }]` )
                        }
                        if ( argument?.type === "BinaryExpression" )
                        {
                            let a = Out.clean( { cash: Out.cleanCash( out ), option: out.option } );
                            ( { out: a } = Binary( code, a, { BinaryExpression: conversion.BinaryExpression } ) )
                            out.cash.code += a.cash.code
                        }
                    }
                }
            }
        }
    }
    return out
}
