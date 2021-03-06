import { Type, Types as ts } from './types';

export class Symbol {
  public code: string;
  public ty: Type;
  public isMatter: boolean = false;
  public isMutable: boolean = false;
  public isSync = false;
  public constructor(code: string, ty: Type, options?: any) {
    this.code = code;
    this.ty = ty.realType();
    if (options !== undefined) {
      this.isMatter = options.isMatter === undefined ? false : options.isMatter;
      this.isMutable = options.isMutable == undefined ? false : options.isMutable;
    }
  }
  public isGlobal() {
    return this.code.indexOf('vars[') == 0;
  }
}

const sym = (code: string, ty: Type) => {
  return new Symbol(code, ty);
}

const sync = (code: string, ty: Type) => {
  const sym = new Symbol(code, ty);
  sym.isSync = true;
  return sym;
}

const mut = (code: string, ty: Type) => {
  const sym = new Symbol(code, ty);
  sym.isMutable = true;
  return sym;
}


const tFuncIntInt = ts.func(ts.Int, ts.Int);
const tFuncIntIntInt = ts.func(ts.Int, ts.Int, ts.Int);
const tFuncFloatFloat = ts.func(ts.Float, ts.Float);
const tFuncFloatFloatFloat = ts.func(ts.Float, ts.Float, ts.Float);
const tFuncFloatListFloat = ts.func(ts.Float, ts.ListInt);
const tFuncBoolFloat = ts.func(ts.Bool, ts.Float);


const import_math: { [key: string]: Symbol | undefined } = {
  'ceil': sym('Math.ceil', tFuncFloatFloat),
  'comb': undefined,
  'copysign': undefined,
  'fabs': sym('Math.abs', tFuncFloatFloat),
  'factorial': undefined,
  'floor': sym('Math.floor', tFuncFloatFloat),
  'fmod': undefined,
  'frexp': undefined,
  'isfinite': sym('Number.isFinite', tFuncBoolFloat),
  'isinf': sym('Number.isInf', tFuncBoolFloat),
  'isnan': sym('Number.isNaN', tFuncBoolFloat),
  'isqrt': undefined,
  'ldexp': undefined,
  'modf': undefined,
  'perm': undefined,
  'prod': undefined,
  'remainder': undefined,
  'trunc': sym('Math.trunc', tFuncFloatFloat),
  // 指数関数と対数関数
  'exp': sym('Math.exp', tFuncFloatFloat),
  'expm1': sym('Math.expm1', tFuncFloatFloat),
  'log': sym('Math.log', tFuncFloatFloat),
  'log1p': sym('Math.log1p', tFuncFloatFloat),
  'log2': sym('Math.log2', tFuncFloatFloat),
  'log10': sym('Math.log10', tFuncFloatFloat),
  'pow': sym('Math.pow', tFuncFloatFloatFloat),
  'sqrt': sym('Math.sqrt', tFuncFloatFloat),

  // 三角関数
  'acos': sym('Math.acos', tFuncFloatFloat),
  'asin': sym('Math.asin', tFuncFloatFloat),
  'atan': sym('Math.atan', tFuncFloatFloat),
  'atan2': sym('Math.atan2', tFuncFloatFloatFloat),
  'cos': sym('Math.cos', tFuncFloatFloat),
  'dist': undefined,
  'hypot': undefined,
  'sin': sym('Math.sin', tFuncFloatFloat),
  'tan': sym('Math.tan', tFuncFloatFloat),

  // 角度変換
  'degrees': sym('lib.degrees', tFuncFloatFloat),
  'radians': sym('lib.radians', tFuncFloatFloat),
  // 双曲線関数
  'acosh': sym('Math.acosh', tFuncFloatFloat),
  'asinh': sym('Math.asinh', tFuncFloatFloat),
  'atanh': sym('Math.atanh', tFuncFloatFloat),
  'cosh': sym('Math.cosh', tFuncFloatFloat),
  'sinh': sym('Math.sinh', tFuncFloatFloat),
  'tanh': sym('Math.tanh', tFuncFloatFloat),
  // 特殊関数
  'erf': undefined,
  'erfc': undefined,
  'gamma': undefined,
  'lgamma': undefined,
  // 定数
  'pi': sym('Math.PI', ts.Float),
  'e': sym('Math.E', ts.Float),
  'tau': undefined,
  'inf': sym('Infinity', ts.Float),
  'nan': sym('NaN', ts.Float),
  // 
  'gcd': sym('lib.gcd', tFuncFloatFloatFloat),
}

const Visual = true;

const import_python: { [key: string]: Symbol | undefined } = {
  'abs': sym('Math.abs', tFuncIntInt),
  'all': undefined,
  'any': undefined,
  'ascii': undefined,
  'bin': undefined,
  'bool': sym('lib.bool', ts.func(ts.Bool, ts.Any)),
  'breakpoint': undefined,
  'bytearray': undefined,
  'bytes': undefined,
  'callable': undefined,
  'chr': sym('lib.chr', ts.func(ts.String, ts.Int)),
  'classmethod': undefined,
  'compile': undefined,
  'complex': undefined,
  'delattr': sym('lib.delattr', ts.func(ts.Void, ts.Object, ts.String)),
  'dict': undefined,
  'dir': undefined,
  'divmod': undefined,
  'enumerate': undefined,
  'eval': undefined,
  'exec': undefined,
  'filter': sym('lib.filter', ts.func(ts.ListA, ts.func(ts.Bool, ts.A), ts.ListA)),
  'float': sym('lib.float', ts.func(ts.Float, ts.union(ts.Bool, ts.String, ts.Int))),
  'format': undefined,
  'frozenset': undefined,
  'getattr': sym('lib.getattr', ts.func(ts.A, ts.Object, ts.String, ts.A)),
  'globals': undefined,
  'hasattr': sym('lib.hasattr', ts.func(ts.Bool, ts.Object, ts.String)),
  'hash': undefined,
  'help': undefined,
  'hex': undefined,
  'id': undefined,
  'input@0': sync('puppy.input', ts.func(ts.String)),
  'input': sync('puppy.input', ts.func(ts.String, ts.String)),
  'int': sym('lib.int', ts.func(ts.Int, ts.union(ts.Bool, ts.String, ts.Int))),
  'int@2': sym('lib.int', ts.func(ts.Int, ts.String, ts.Int)),
  'isinstance': sym('lib.isinstance', ts.func(ts.Bool, ts.Any, ts.Any)),
  'issubclass': undefined,
  'iter': undefined,
  'len': sym('lib.len', ts.func(ts.Int, ts.union(ts.String, ts.ListAny))),
  'list': sym('lib.list', ts.func(ts.ListString, ts.String)),
  'locals': undefined,
  'map': sym('lib.map', ts.func(ts.ListB, ts.func(ts.B, ts.A), ts.ListA)),
  'max@1': sym('lib.max1', tFuncFloatListFloat),
  'max': sym('lib.max', tFuncFloatFloatFloat),
  'memoryview': undefined,
  'min@1': sym('lib.min1', tFuncFloatListFloat),
  'min': sym('lib.min', tFuncFloatFloatFloat),
  'next': undefined,
  'object': undefined,
  'oct': undefined,
  'open': undefined,
  'ord': undefined,
  'pow': sym('Math.pow', tFuncFloatFloatFloat),

  'print@0': sym('puppy.print1', ts.func(ts.Void, ts.Any, ts.Option)),
  'print': sym('puppy.print1', ts.func(ts.Void, ts.Any, ts.Option)),
  'print@2': sym('puppy.print2', ts.func(ts.Void, ts.Any, ts.Any, ts.Option)),
  'print@3': sym('puppy.print3', ts.func(ts.Void, ts.Any, ts.Any, ts.Any, ts.Option)),
  'print@4': sym('puppy.print4', ts.func(ts.Void, ts.Any, ts.Any, ts.Any, ts.Any, ts.Option)),
  'property': undefined,
  //
  'range@1': sym('lib.range1', ts.func(ts.ListInt, ts.Int)),
  'range@2': sym('lib.range2', ts.func(ts.ListInt, ts.Int, ts.Int)),
  'range': sym('lib.range', ts.func(ts.ListInt, ts.Int, ts.Int, ts.Int)),
  //
  'reserved': sym('lib.reserved', ts.func(ts.ListA, ts.ListA)),
  'round': sym('Math.round', tFuncIntInt),
  'set': undefined,
  'setattr': sym('lib.setattr', ts.func(ts.Void, ts.Object, ts.String, ts.Any)),
  //
  'slice': undefined,
  'sorted': sym('lib.sorted', ts.func(ts.ListA, ts.ListA)),
  'str': sym('lib.str', ts.func(ts.String, ts.Any)),
  'sum': sym('lib.str', ts.func(ts.Int, ts.ListInt)),
  'super': undefined,
  'tuple': undefined,
  'type': undefined,
  'vars': undefined,
  'zip': undefined,

  //append
  '.append': sym('lib.append', ts.func(ts.Void, ts.ListA, ts.A)),
  // string
  '.find': sym('lib.find', ts.func(ts.Int, ts.String, ts.String)),
  '.rfind': sym('lib.rfind', ts.func(ts.Int, ts.String, ts.String)),
  '.startswith': sym('lib.startswith', ts.func(ts.Bool, ts.String, ts.String)),
  '.endswith': sym('lib.startswith', ts.func(ts.Bool, ts.String, ts.String)),
  '.isupper': sym('lib.isupper', ts.func(ts.Bool, ts.String)),
  '.islower': sym('lib.islower', ts.func(ts.Bool, ts.String)),
  '.lower': sym('lib.lower', ts.func(ts.String, ts.String)),
  '.upper': sym('lib.upper', ts.func(ts.String, ts.String)),
  '.join': sym('lib.join', ts.func(ts.String, ts.String, ts.ListString)),
  '.split': sym('lib.split', ts.func(ts.ListString, ts.String, ts.String)),
  '.replace': sym('lib.replace', ts.func(ts.String, ts.String, ts.String, ts.String)),

}

const import_random: { [key: string]: Symbol } = {
  'random': sym('Math.random', ts.func(ts.Int)),
}

const tFuncShape = ts.func(ts.Matter, ts.Option);
const tFuncShape2 = ts.func(ts.Matter, ts.Int, ts.Int, ts.Option);
const tFuncShape3 = ts.func(ts.Matter, ts.Int, ts.Int, ts.Int, ts.Option);
const tFuncShape4 = ts.func(ts.Matter, ts.Int, ts.Int, ts.Int, ts.Int, ts.Option);
const tFuncShapeS1 = ts.func(ts.Matter, ts.String, ts.Option);

const tFuncBody = ts.func(ts.Void, ts.Matter);
const tFuncBodyInt = ts.func(ts.Void, ts.Matter, ts.Int);
const tFuncBodyBody = ts.func(ts.Void, ts.Matter, ts.Matter);

const import_puppy2d: { [key: string]: Symbol } = {
  // # クラス
  'World': sym('puppy.World', tFuncShape),
  'Object': sym('puppy.Object', tFuncShape),
  'Body': sym('puppy.Body', tFuncShape),
  'Rectangle': sym('puppy.Rectangle', tFuncShape4),
  'Rectangle@3': sym('puppy.Rectangle3', tFuncShape3),
  'Rectangle@2': sym('puppy.Rectangle2', tFuncShape2),
  'Rectangle@0': sym('puppy.Rectangle0', tFuncShape),
  'Circle': sym('puppy.Circle', tFuncShape3),
  'Circle@2': sym('puppy.Circle2', tFuncShape2),
  'Circle@0': sym('puppy.Circle0', tFuncShape),
  'Variable': sym('puppy.Variable', tFuncShapeS1),
  'Constraint': sym('puppy.Constraint', tFuncShape),
  // world
  'setGravity': sym('puppy.setGravity', ts.func(ts.Void, ts.Int, ts.Int)),
  'setViewport': sym('puppy.setViewport', ts.func(ts.Void, ts.Int, ts.Int, ts.Int, ts.Int)),
  'paint': sym('puppy.paint', ts.func(ts.Void, ts.Int, ts.Int, ts.Option)),
  'plot': sym('puppy.plot', ts.func(ts.Void, ts.Int, ts.Int, ts.Option)),
  'remove': sym('puppy.removeBody', ts.func(ts.Void, ts.Matter)),

  // # 物体メソッド
  '.setPosition': sym('lib.setPosition', ts.func(ts.Matter, ts.Matter, ts.Int, ts.Int)),
  '.applyForce': sym('lib.applyForce', ts.func(ts.Matter, ts.Matter, ts.Int, ts.Int)),
  '.rotate': sym('lib.rotate', ts.func(ts.Matter, ts.Matter, ts.Int)),
  '.scale': sym('lib.scale', ts.func(ts.Matter, ts.Matter, ts.Int, ts.Int)),
  '.addMotion': sym('lib.addMotion', ts.func(ts.Matter, ts.Matter, tFuncBody)),
  '.removeMotion': sym('lib.removeMotion', ts.func(ts.Matter, ts.Matter, tFuncBody)),
  '.setAngle': sym('lib.setAngle', ts.func(ts.Void, ts.Matter, ts.Int)),
  // '.setAngularVelocity': sym('lib.setAngularVelocity', ts.func(ts.Void, ts.Matter, ts.Int)),
  // '.setDensity': sym('lib.setDensity', ts.func(ts.Void, ts.Matter, ts.Int)),
  // '.setMass': sym('lib.setMass', ts.func(ts.Void, ts.Matter, ts.Int)),
  // '.setStatic': sym('lib.setStatic', ts.func(ts.Void, ts.Matter, ts.Bool)),
  // '.setVelocity': sym('lib.setVelocity', ts.func(ts.Void, ts.Matter, ts.Int)),
};

export const PuppyModules: { [key: string]: { [key: string]: Symbol | undefined } } = {
  '': import_python,
  'math': import_math,
  'random': import_random,
  'puppy2d': import_puppy2d,
};

export const PackageSymbolMap: any = {

};

const checkSymbolNames = () => {
  for (const pkgname of Object.keys(PuppyModules)) {
    const pack = PuppyModules[pkgname];
    for (const name of Object.keys(pack)) {
      if (pack[name] !== undefined) {
        PackageSymbolMap[name] = pkgname;
      }
    }
  }
}

checkSymbolNames();

export type Field = {
  base: Type;
  getter: string;
  setter: string;
  ty: Type;
}

const _field_ = (base: Type, getter: string, setter: string, ty: Type) => {
  return { base, getter, setter, ty } as Field;
}



const FIELDS: { [key: string]: Field } = {
  'x': _field_(ts.Vec, 'x', 'puppy.set("x",', ts.Int),
  'y': _field_(ts.Vec, 'y', 'puppy.set("y",', ts.Int),
  'position': _field_(ts.Object, '$.position', '$.setPosition($)', ts.Vec),
  'width': _field_(ts.Object, '$.getWidth()', '$.setWidth($)', ts.Int),
  'height': _field_(ts.Object, '$.getHeight()', '$.setHeight($)', ts.Int),
  'mass': _field_(ts.Object, '$.mass', '$.setMass($)', ts.Int),
  'density': _field_(ts.Object, '$.density', '$.setDensity($)', ts.Int),
  'fillStyle': _field_(ts.Object, 'fillStyle', "$.set('fillStyle',$)", ts.String),
  'clicked': _field_(ts.Object, 'clicked', "$.set('clicked',$)", tFuncBodyInt),
  'in': _field_(ts.Object, 'movein', "$.set('movein',$)", tFuncBodyBody),
  'out': _field_(ts.Object, 'moveout', "$.set('moveout',$)", tFuncBodyBody),
  'over': _field_(ts.Object, 'moveover', "$.set('moveover',$)", tFuncBodyBody),
}

export const getField = (env: any, name: any, tree: any): Field => {
  var field = FIELDS[name];
  if (field === undefined) {
    const fields = env.getroot('@fields') as { [key: string]: Field };
    field = fields[name];
    if (field === undefined) {
      const ty = env.guessType(name, tree);
      console.log(`GUESS ${name} ${ty}`);
      field = _field_(ts.Object, name, `$.set('${name}',$)`, ty);
      fields[name] = field;
    }
  }
  return field;
}

export const KEYTYPES: { [key: string]: Type } = {
  'x': ts.Int, 'y': ts.Int,  // Vec
  'position': ts.Vec,
  'width': ts.Int, 'height': ts.Int,

  'fillStyle': ts.Color,
  'strokeStyle': ts.Color,
  'lineWidth': ts.Int,
  'image': ts.String,
  'font': ts.String,
  'fontColor': ts.Color,

  'restitution': ts.Float,
  'angle': ts.Float,
  'mass': ts.Int, 'density': ts.Int, 'area': ts.Int,
  'friction': ts.Float, 'frictionStatic': ts.Float, 'airFriction': ts.Float,
  'torque': ts.Float, 'stiffness': ts.Float,
  'isSensor': ts.Bool,
  'isStatic': ts.Bool,
  'damping': ts.Float,
  'in': ts.func(ts.Void, ts.Matter, ts.Matter),
  'out': ts.func(ts.Void, ts.Matter, ts.Matter),
  'over': ts.func(ts.Void, ts.Matter, ts.Matter),
  'clicked': ts.func(ts.Void, ts.Matter),
  'textAlign': ts.String,
  'value': ts.Int,
  'message': ts.String,
  'showing': ts.String,
}

//const ty1 = this.check(tleft(op), env, t['left'], out1);
//const ty2 = this.check(tright(op, ty1), env, t['right'], out2);
//return tbinary(env, t, ty1, out1.join(''), ty2, out1.join(''), out);


