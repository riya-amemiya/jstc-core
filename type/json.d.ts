declare module "*/package.json" {
    interface RootObject
    {
        name: string;
        version: string;
        description: string;
        main: string;
        scripts: Scripts;
        keywords: any[];
        author: string;
        license: string;
        devDependencies: DevDependencies;
        dependencies: Dependencies;
        bin: Bin;
    }

    interface Bin
    {
        jstc: string;
    }

    interface Dependencies
    {
        acorn: string;
        'acorn-loose': string;
        'acorn-node': string;
        'acorn-walk': string;
        tslib: string;
    }

    interface DevDependencies
    {
        '@babel/cli': string;
        '@babel/core': string;
        '@babel/plugin-proposal-class-properties': string;
        '@babel/plugin-proposal-object-rest-spread': string;
        '@babel/preset-env': string;
        '@babel/preset-typescript': string;
        babili: string;
        fcc_typescript: string;
        typescript: string;
    }

    interface Scripts
    {
        test: string;
        typescript: string;
        babel: string;
        build: string;
        start: string;
    }
    const json: RootObject;
    export = json
}