import React from 'react';

export type HOC<InjectProps = any, PreProps = any> = 
    (<Props>(Component: React.ComponentType<Props & InjectProps>) => React.ComponentType<Props>)
    & { PRE_PROPS_TYPE_HELPER ?: PreProps };

export class Lifter<InjectProps> {
    public static lift = <T extends object, I>(hoc: HOC<T, I>): Lifter<I & T> => new Lifter([hoc]);

    private constructor(private hocs: HOC<never>[]) {}

    public lift = <T extends object>(hoc: HOC<T, InjectProps>): Lifter<InjectProps & T> => new Lifter([...this.hocs, hoc]);

    public use: HOC<InjectProps> = c => this.hocs.reduce((acc: any, hoc) => hoc(acc), c);
}