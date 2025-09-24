
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Student
 * 
 */
export type Student = $Result.DefaultSelection<Prisma.$StudentPayload>
/**
 * Model StudentAttendance
 * 
 */
export type StudentAttendance = $Result.DefaultSelection<Prisma.$StudentAttendancePayload>
/**
 * Model Attendance
 * 
 */
export type Attendance = $Result.DefaultSelection<Prisma.$AttendancePayload>
/**
 * Model Class
 * 
 */
export type Class = $Result.DefaultSelection<Prisma.$ClassPayload>
/**
 * Model QRSession
 * 
 */
export type QRSession = $Result.DefaultSelection<Prisma.$QRSessionPayload>
/**
 * Model GeofenceSettings
 * 
 */
export type GeofenceSettings = $Result.DefaultSelection<Prisma.$GeofenceSettingsPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.student`: Exposes CRUD operations for the **Student** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Students
    * const students = await prisma.student.findMany()
    * ```
    */
  get student(): Prisma.StudentDelegate<ExtArgs>;

  /**
   * `prisma.studentAttendance`: Exposes CRUD operations for the **StudentAttendance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StudentAttendances
    * const studentAttendances = await prisma.studentAttendance.findMany()
    * ```
    */
  get studentAttendance(): Prisma.StudentAttendanceDelegate<ExtArgs>;

  /**
   * `prisma.attendance`: Exposes CRUD operations for the **Attendance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Attendances
    * const attendances = await prisma.attendance.findMany()
    * ```
    */
  get attendance(): Prisma.AttendanceDelegate<ExtArgs>;

  /**
   * `prisma.class`: Exposes CRUD operations for the **Class** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Classes
    * const classes = await prisma.class.findMany()
    * ```
    */
  get class(): Prisma.ClassDelegate<ExtArgs>;

  /**
   * `prisma.qRSession`: Exposes CRUD operations for the **QRSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QRSessions
    * const qRSessions = await prisma.qRSession.findMany()
    * ```
    */
  get qRSession(): Prisma.QRSessionDelegate<ExtArgs>;

  /**
   * `prisma.geofenceSettings`: Exposes CRUD operations for the **GeofenceSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GeofenceSettings
    * const geofenceSettings = await prisma.geofenceSettings.findMany()
    * ```
    */
  get geofenceSettings(): Prisma.GeofenceSettingsDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Student: 'Student',
    StudentAttendance: 'StudentAttendance',
    Attendance: 'Attendance',
    Class: 'Class',
    QRSession: 'QRSession',
    GeofenceSettings: 'GeofenceSettings'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "student" | "studentAttendance" | "attendance" | "class" | "qRSession" | "geofenceSettings"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Student: {
        payload: Prisma.$StudentPayload<ExtArgs>
        fields: Prisma.StudentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findFirst: {
            args: Prisma.StudentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findMany: {
            args: Prisma.StudentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          create: {
            args: Prisma.StudentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          createMany: {
            args: Prisma.StudentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          delete: {
            args: Prisma.StudentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          update: {
            args: Prisma.StudentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          deleteMany: {
            args: Prisma.StudentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StudentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          aggregate: {
            args: Prisma.StudentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudent>
          }
          groupBy: {
            args: Prisma.StudentGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentCountArgs<ExtArgs>
            result: $Utils.Optional<StudentCountAggregateOutputType> | number
          }
        }
      }
      StudentAttendance: {
        payload: Prisma.$StudentAttendancePayload<ExtArgs>
        fields: Prisma.StudentAttendanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentAttendanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentAttendancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentAttendanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentAttendancePayload>
          }
          findFirst: {
            args: Prisma.StudentAttendanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentAttendancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentAttendanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentAttendancePayload>
          }
          findMany: {
            args: Prisma.StudentAttendanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentAttendancePayload>[]
          }
          create: {
            args: Prisma.StudentAttendanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentAttendancePayload>
          }
          createMany: {
            args: Prisma.StudentAttendanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudentAttendanceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentAttendancePayload>[]
          }
          delete: {
            args: Prisma.StudentAttendanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentAttendancePayload>
          }
          update: {
            args: Prisma.StudentAttendanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentAttendancePayload>
          }
          deleteMany: {
            args: Prisma.StudentAttendanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentAttendanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StudentAttendanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentAttendancePayload>
          }
          aggregate: {
            args: Prisma.StudentAttendanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudentAttendance>
          }
          groupBy: {
            args: Prisma.StudentAttendanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentAttendanceGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentAttendanceCountArgs<ExtArgs>
            result: $Utils.Optional<StudentAttendanceCountAggregateOutputType> | number
          }
        }
      }
      Attendance: {
        payload: Prisma.$AttendancePayload<ExtArgs>
        fields: Prisma.AttendanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AttendanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AttendanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          findFirst: {
            args: Prisma.AttendanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AttendanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          findMany: {
            args: Prisma.AttendanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>[]
          }
          create: {
            args: Prisma.AttendanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          createMany: {
            args: Prisma.AttendanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AttendanceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>[]
          }
          delete: {
            args: Prisma.AttendanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          update: {
            args: Prisma.AttendanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          deleteMany: {
            args: Prisma.AttendanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AttendanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AttendanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          aggregate: {
            args: Prisma.AttendanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttendance>
          }
          groupBy: {
            args: Prisma.AttendanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<AttendanceGroupByOutputType>[]
          }
          count: {
            args: Prisma.AttendanceCountArgs<ExtArgs>
            result: $Utils.Optional<AttendanceCountAggregateOutputType> | number
          }
        }
      }
      Class: {
        payload: Prisma.$ClassPayload<ExtArgs>
        fields: Prisma.ClassFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClassFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClassFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          findFirst: {
            args: Prisma.ClassFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClassFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          findMany: {
            args: Prisma.ClassFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>[]
          }
          create: {
            args: Prisma.ClassCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          createMany: {
            args: Prisma.ClassCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClassCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>[]
          }
          delete: {
            args: Prisma.ClassDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          update: {
            args: Prisma.ClassUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          deleteMany: {
            args: Prisma.ClassDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClassUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ClassUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          aggregate: {
            args: Prisma.ClassAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClass>
          }
          groupBy: {
            args: Prisma.ClassGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClassGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClassCountArgs<ExtArgs>
            result: $Utils.Optional<ClassCountAggregateOutputType> | number
          }
        }
      }
      QRSession: {
        payload: Prisma.$QRSessionPayload<ExtArgs>
        fields: Prisma.QRSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QRSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QRSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRSessionPayload>
          }
          findFirst: {
            args: Prisma.QRSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QRSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRSessionPayload>
          }
          findMany: {
            args: Prisma.QRSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRSessionPayload>[]
          }
          create: {
            args: Prisma.QRSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRSessionPayload>
          }
          createMany: {
            args: Prisma.QRSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QRSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRSessionPayload>[]
          }
          delete: {
            args: Prisma.QRSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRSessionPayload>
          }
          update: {
            args: Prisma.QRSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRSessionPayload>
          }
          deleteMany: {
            args: Prisma.QRSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QRSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.QRSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QRSessionPayload>
          }
          aggregate: {
            args: Prisma.QRSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQRSession>
          }
          groupBy: {
            args: Prisma.QRSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<QRSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.QRSessionCountArgs<ExtArgs>
            result: $Utils.Optional<QRSessionCountAggregateOutputType> | number
          }
        }
      }
      GeofenceSettings: {
        payload: Prisma.$GeofenceSettingsPayload<ExtArgs>
        fields: Prisma.GeofenceSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GeofenceSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeofenceSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GeofenceSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeofenceSettingsPayload>
          }
          findFirst: {
            args: Prisma.GeofenceSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeofenceSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GeofenceSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeofenceSettingsPayload>
          }
          findMany: {
            args: Prisma.GeofenceSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeofenceSettingsPayload>[]
          }
          create: {
            args: Prisma.GeofenceSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeofenceSettingsPayload>
          }
          createMany: {
            args: Prisma.GeofenceSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GeofenceSettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeofenceSettingsPayload>[]
          }
          delete: {
            args: Prisma.GeofenceSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeofenceSettingsPayload>
          }
          update: {
            args: Prisma.GeofenceSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeofenceSettingsPayload>
          }
          deleteMany: {
            args: Prisma.GeofenceSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GeofenceSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GeofenceSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GeofenceSettingsPayload>
          }
          aggregate: {
            args: Prisma.GeofenceSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGeofenceSettings>
          }
          groupBy: {
            args: Prisma.GeofenceSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<GeofenceSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.GeofenceSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<GeofenceSettingsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    attendance: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendance?: boolean | UserCountOutputTypeCountAttendanceArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAttendanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendanceWhereInput
  }


  /**
   * Count Type StudentCountOutputType
   */

  export type StudentCountOutputType = {
    attendance: number
  }

  export type StudentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendance?: boolean | StudentCountOutputTypeCountAttendanceArgs
  }

  // Custom InputTypes
  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCountOutputType
     */
    select?: StudentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountAttendanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentAttendanceWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    name: string | null
    employeeId: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    name: string | null
    employeeId: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    employeeId: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    employeeId?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    employeeId?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    employeeId?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    password: string
    name: string
    employeeId: string | null
    role: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    employeeId?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    attendance?: boolean | User$attendanceArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    employeeId?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    employeeId?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendance?: boolean | User$attendanceArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      attendance: Prisma.$AttendancePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      password: string
      name: string
      employeeId: string | null
      role: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attendance<T extends User$attendanceArgs<ExtArgs> = {}>(args?: Subset<T, User$attendanceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly employeeId: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.attendance
   */
  export type User$attendanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    where?: AttendanceWhereInput
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    cursor?: AttendanceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Student
   */

  export type AggregateStudent = {
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  export type StudentAvgAggregateOutputType = {
    id: number | null
    gpa: number | null
  }

  export type StudentSumAggregateOutputType = {
    id: number | null
    gpa: number | null
  }

  export type StudentMinAggregateOutputType = {
    id: number | null
    studentId: string | null
    name: string | null
    email: string | null
    password: string | null
    phone: string | null
    department: string | null
    class: string | null
    section: string | null
    year: string | null
    enrollmentDate: Date | null
    status: string | null
    gpa: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StudentMaxAggregateOutputType = {
    id: number | null
    studentId: string | null
    name: string | null
    email: string | null
    password: string | null
    phone: string | null
    department: string | null
    class: string | null
    section: string | null
    year: string | null
    enrollmentDate: Date | null
    status: string | null
    gpa: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StudentCountAggregateOutputType = {
    id: number
    studentId: number
    name: number
    email: number
    password: number
    phone: number
    department: number
    class: number
    section: number
    year: number
    enrollmentDate: number
    status: number
    gpa: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StudentAvgAggregateInputType = {
    id?: true
    gpa?: true
  }

  export type StudentSumAggregateInputType = {
    id?: true
    gpa?: true
  }

  export type StudentMinAggregateInputType = {
    id?: true
    studentId?: true
    name?: true
    email?: true
    password?: true
    phone?: true
    department?: true
    class?: true
    section?: true
    year?: true
    enrollmentDate?: true
    status?: true
    gpa?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StudentMaxAggregateInputType = {
    id?: true
    studentId?: true
    name?: true
    email?: true
    password?: true
    phone?: true
    department?: true
    class?: true
    section?: true
    year?: true
    enrollmentDate?: true
    status?: true
    gpa?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StudentCountAggregateInputType = {
    id?: true
    studentId?: true
    name?: true
    email?: true
    password?: true
    phone?: true
    department?: true
    class?: true
    section?: true
    year?: true
    enrollmentDate?: true
    status?: true
    gpa?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StudentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Student to aggregate.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Students
    **/
    _count?: true | StudentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StudentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StudentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentMaxAggregateInputType
  }

  export type GetStudentAggregateType<T extends StudentAggregateArgs> = {
        [P in keyof T & keyof AggregateStudent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudent[P]>
      : GetScalarType<T[P], AggregateStudent[P]>
  }




  export type StudentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithAggregationInput | StudentOrderByWithAggregationInput[]
    by: StudentScalarFieldEnum[] | StudentScalarFieldEnum
    having?: StudentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentCountAggregateInputType | true
    _avg?: StudentAvgAggregateInputType
    _sum?: StudentSumAggregateInputType
    _min?: StudentMinAggregateInputType
    _max?: StudentMaxAggregateInputType
  }

  export type StudentGroupByOutputType = {
    id: number
    studentId: string
    name: string
    email: string
    password: string
    phone: string | null
    department: string
    class: string
    section: string
    year: string
    enrollmentDate: Date
    status: string
    gpa: number | null
    createdAt: Date
    updatedAt: Date
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  type GetStudentGroupByPayload<T extends StudentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentGroupByOutputType[P]>
            : GetScalarType<T[P], StudentGroupByOutputType[P]>
        }
      >
    >


  export type StudentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    phone?: boolean
    department?: boolean
    class?: boolean
    section?: boolean
    year?: boolean
    enrollmentDate?: boolean
    status?: boolean
    gpa?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    attendance?: boolean | Student$attendanceArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>

  export type StudentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    phone?: boolean
    department?: boolean
    class?: boolean
    section?: boolean
    year?: boolean
    enrollmentDate?: boolean
    status?: boolean
    gpa?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["student"]>

  export type StudentSelectScalar = {
    id?: boolean
    studentId?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    phone?: boolean
    department?: boolean
    class?: boolean
    section?: boolean
    year?: boolean
    enrollmentDate?: boolean
    status?: boolean
    gpa?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StudentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendance?: boolean | Student$attendanceArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StudentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $StudentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Student"
    objects: {
      attendance: Prisma.$StudentAttendancePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      studentId: string
      name: string
      email: string
      password: string
      phone: string | null
      department: string
      class: string
      section: string
      year: string
      enrollmentDate: Date
      status: string
      gpa: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["student"]>
    composites: {}
  }

  type StudentGetPayload<S extends boolean | null | undefined | StudentDefaultArgs> = $Result.GetResult<Prisma.$StudentPayload, S>

  type StudentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StudentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StudentCountAggregateInputType | true
    }

  export interface StudentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Student'], meta: { name: 'Student' } }
    /**
     * Find zero or one Student that matches the filter.
     * @param {StudentFindUniqueArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentFindUniqueArgs>(args: SelectSubset<T, StudentFindUniqueArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Student that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StudentFindUniqueOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Student that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentFindFirstArgs>(args?: SelectSubset<T, StudentFindFirstArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Student that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Students that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Students
     * const students = await prisma.student.findMany()
     * 
     * // Get first 10 Students
     * const students = await prisma.student.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const studentWithIdOnly = await prisma.student.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StudentFindManyArgs>(args?: SelectSubset<T, StudentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Student.
     * @param {StudentCreateArgs} args - Arguments to create a Student.
     * @example
     * // Create one Student
     * const Student = await prisma.student.create({
     *   data: {
     *     // ... data to create a Student
     *   }
     * })
     * 
     */
    create<T extends StudentCreateArgs>(args: SelectSubset<T, StudentCreateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Students.
     * @param {StudentCreateManyArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentCreateManyArgs>(args?: SelectSubset<T, StudentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Students and returns the data saved in the database.
     * @param {StudentCreateManyAndReturnArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Students and only return the `id`
     * const studentWithIdOnly = await prisma.student.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudentCreateManyAndReturnArgs>(args?: SelectSubset<T, StudentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Student.
     * @param {StudentDeleteArgs} args - Arguments to delete one Student.
     * @example
     * // Delete one Student
     * const Student = await prisma.student.delete({
     *   where: {
     *     // ... filter to delete one Student
     *   }
     * })
     * 
     */
    delete<T extends StudentDeleteArgs>(args: SelectSubset<T, StudentDeleteArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Student.
     * @param {StudentUpdateArgs} args - Arguments to update one Student.
     * @example
     * // Update one Student
     * const student = await prisma.student.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentUpdateArgs>(args: SelectSubset<T, StudentUpdateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Students.
     * @param {StudentDeleteManyArgs} args - Arguments to filter Students to delete.
     * @example
     * // Delete a few Students
     * const { count } = await prisma.student.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentDeleteManyArgs>(args?: SelectSubset<T, StudentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentUpdateManyArgs>(args: SelectSubset<T, StudentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Student.
     * @param {StudentUpsertArgs} args - Arguments to update or create a Student.
     * @example
     * // Update or create a Student
     * const student = await prisma.student.upsert({
     *   create: {
     *     // ... data to create a Student
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Student we want to update
     *   }
     * })
     */
    upsert<T extends StudentUpsertArgs>(args: SelectSubset<T, StudentUpsertArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCountArgs} args - Arguments to filter Students to count.
     * @example
     * // Count the number of Students
     * const count = await prisma.student.count({
     *   where: {
     *     // ... the filter for the Students we want to count
     *   }
     * })
    **/
    count<T extends StudentCountArgs>(
      args?: Subset<T, StudentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StudentAggregateArgs>(args: Subset<T, StudentAggregateArgs>): Prisma.PrismaPromise<GetStudentAggregateType<T>>

    /**
     * Group by Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StudentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentGroupByArgs['orderBy'] }
        : { orderBy?: StudentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StudentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Student model
   */
  readonly fields: StudentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Student.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attendance<T extends Student$attendanceArgs<ExtArgs> = {}>(args?: Subset<T, Student$attendanceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentAttendancePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Student model
   */ 
  interface StudentFieldRefs {
    readonly id: FieldRef<"Student", 'Int'>
    readonly studentId: FieldRef<"Student", 'String'>
    readonly name: FieldRef<"Student", 'String'>
    readonly email: FieldRef<"Student", 'String'>
    readonly password: FieldRef<"Student", 'String'>
    readonly phone: FieldRef<"Student", 'String'>
    readonly department: FieldRef<"Student", 'String'>
    readonly class: FieldRef<"Student", 'String'>
    readonly section: FieldRef<"Student", 'String'>
    readonly year: FieldRef<"Student", 'String'>
    readonly enrollmentDate: FieldRef<"Student", 'DateTime'>
    readonly status: FieldRef<"Student", 'String'>
    readonly gpa: FieldRef<"Student", 'Float'>
    readonly createdAt: FieldRef<"Student", 'DateTime'>
    readonly updatedAt: FieldRef<"Student", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Student findUnique
   */
  export type StudentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findUniqueOrThrow
   */
  export type StudentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findFirst
   */
  export type StudentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findFirstOrThrow
   */
  export type StudentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findMany
   */
  export type StudentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Students to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student create
   */
  export type StudentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to create a Student.
     */
    data: XOR<StudentCreateInput, StudentUncheckedCreateInput>
  }

  /**
   * Student createMany
   */
  export type StudentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Student createManyAndReturn
   */
  export type StudentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Student update
   */
  export type StudentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to update a Student.
     */
    data: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
    /**
     * Choose, which Student to update.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student updateMany
   */
  export type StudentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
  }

  /**
   * Student upsert
   */
  export type StudentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The filter to search for the Student to update in case it exists.
     */
    where: StudentWhereUniqueInput
    /**
     * In case the Student found by the `where` argument doesn't exist, create a new Student with this data.
     */
    create: XOR<StudentCreateInput, StudentUncheckedCreateInput>
    /**
     * In case the Student was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
  }

  /**
   * Student delete
   */
  export type StudentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter which Student to delete.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student deleteMany
   */
  export type StudentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Students to delete
     */
    where?: StudentWhereInput
  }

  /**
   * Student.attendance
   */
  export type Student$attendanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAttendance
     */
    select?: StudentAttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAttendanceInclude<ExtArgs> | null
    where?: StudentAttendanceWhereInput
    orderBy?: StudentAttendanceOrderByWithRelationInput | StudentAttendanceOrderByWithRelationInput[]
    cursor?: StudentAttendanceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StudentAttendanceScalarFieldEnum | StudentAttendanceScalarFieldEnum[]
  }

  /**
   * Student without action
   */
  export type StudentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
  }


  /**
   * Model StudentAttendance
   */

  export type AggregateStudentAttendance = {
    _count: StudentAttendanceCountAggregateOutputType | null
    _avg: StudentAttendanceAvgAggregateOutputType | null
    _sum: StudentAttendanceSumAggregateOutputType | null
    _min: StudentAttendanceMinAggregateOutputType | null
    _max: StudentAttendanceMaxAggregateOutputType | null
  }

  export type StudentAttendanceAvgAggregateOutputType = {
    id: number | null
    studentId: number | null
    studentLatitude: number | null
    studentLongitude: number | null
    distanceFromClass: number | null
  }

  export type StudentAttendanceSumAggregateOutputType = {
    id: number | null
    studentId: number | null
    studentLatitude: number | null
    studentLongitude: number | null
    distanceFromClass: number | null
  }

  export type StudentAttendanceMinAggregateOutputType = {
    id: number | null
    studentId: number | null
    classId: string | null
    date: Date | null
    status: string | null
    timestamp: string | null
    studentLatitude: number | null
    studentLongitude: number | null
    distanceFromClass: number | null
    locationVerified: boolean | null
    createdAt: Date | null
  }

  export type StudentAttendanceMaxAggregateOutputType = {
    id: number | null
    studentId: number | null
    classId: string | null
    date: Date | null
    status: string | null
    timestamp: string | null
    studentLatitude: number | null
    studentLongitude: number | null
    distanceFromClass: number | null
    locationVerified: boolean | null
    createdAt: Date | null
  }

  export type StudentAttendanceCountAggregateOutputType = {
    id: number
    studentId: number
    classId: number
    date: number
    status: number
    timestamp: number
    studentLatitude: number
    studentLongitude: number
    distanceFromClass: number
    locationVerified: number
    createdAt: number
    _all: number
  }


  export type StudentAttendanceAvgAggregateInputType = {
    id?: true
    studentId?: true
    studentLatitude?: true
    studentLongitude?: true
    distanceFromClass?: true
  }

  export type StudentAttendanceSumAggregateInputType = {
    id?: true
    studentId?: true
    studentLatitude?: true
    studentLongitude?: true
    distanceFromClass?: true
  }

  export type StudentAttendanceMinAggregateInputType = {
    id?: true
    studentId?: true
    classId?: true
    date?: true
    status?: true
    timestamp?: true
    studentLatitude?: true
    studentLongitude?: true
    distanceFromClass?: true
    locationVerified?: true
    createdAt?: true
  }

  export type StudentAttendanceMaxAggregateInputType = {
    id?: true
    studentId?: true
    classId?: true
    date?: true
    status?: true
    timestamp?: true
    studentLatitude?: true
    studentLongitude?: true
    distanceFromClass?: true
    locationVerified?: true
    createdAt?: true
  }

  export type StudentAttendanceCountAggregateInputType = {
    id?: true
    studentId?: true
    classId?: true
    date?: true
    status?: true
    timestamp?: true
    studentLatitude?: true
    studentLongitude?: true
    distanceFromClass?: true
    locationVerified?: true
    createdAt?: true
    _all?: true
  }

  export type StudentAttendanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StudentAttendance to aggregate.
     */
    where?: StudentAttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentAttendances to fetch.
     */
    orderBy?: StudentAttendanceOrderByWithRelationInput | StudentAttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentAttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentAttendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentAttendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StudentAttendances
    **/
    _count?: true | StudentAttendanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StudentAttendanceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StudentAttendanceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentAttendanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentAttendanceMaxAggregateInputType
  }

  export type GetStudentAttendanceAggregateType<T extends StudentAttendanceAggregateArgs> = {
        [P in keyof T & keyof AggregateStudentAttendance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudentAttendance[P]>
      : GetScalarType<T[P], AggregateStudentAttendance[P]>
  }




  export type StudentAttendanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentAttendanceWhereInput
    orderBy?: StudentAttendanceOrderByWithAggregationInput | StudentAttendanceOrderByWithAggregationInput[]
    by: StudentAttendanceScalarFieldEnum[] | StudentAttendanceScalarFieldEnum
    having?: StudentAttendanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentAttendanceCountAggregateInputType | true
    _avg?: StudentAttendanceAvgAggregateInputType
    _sum?: StudentAttendanceSumAggregateInputType
    _min?: StudentAttendanceMinAggregateInputType
    _max?: StudentAttendanceMaxAggregateInputType
  }

  export type StudentAttendanceGroupByOutputType = {
    id: number
    studentId: number
    classId: string
    date: Date
    status: string
    timestamp: string | null
    studentLatitude: number | null
    studentLongitude: number | null
    distanceFromClass: number | null
    locationVerified: boolean
    createdAt: Date
    _count: StudentAttendanceCountAggregateOutputType | null
    _avg: StudentAttendanceAvgAggregateOutputType | null
    _sum: StudentAttendanceSumAggregateOutputType | null
    _min: StudentAttendanceMinAggregateOutputType | null
    _max: StudentAttendanceMaxAggregateOutputType | null
  }

  type GetStudentAttendanceGroupByPayload<T extends StudentAttendanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentAttendanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentAttendanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentAttendanceGroupByOutputType[P]>
            : GetScalarType<T[P], StudentAttendanceGroupByOutputType[P]>
        }
      >
    >


  export type StudentAttendanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    classId?: boolean
    date?: boolean
    status?: boolean
    timestamp?: boolean
    studentLatitude?: boolean
    studentLongitude?: boolean
    distanceFromClass?: boolean
    locationVerified?: boolean
    createdAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentAttendance"]>

  export type StudentAttendanceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    classId?: boolean
    date?: boolean
    status?: boolean
    timestamp?: boolean
    studentLatitude?: boolean
    studentLongitude?: boolean
    distanceFromClass?: boolean
    locationVerified?: boolean
    createdAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentAttendance"]>

  export type StudentAttendanceSelectScalar = {
    id?: boolean
    studentId?: boolean
    classId?: boolean
    date?: boolean
    status?: boolean
    timestamp?: boolean
    studentLatitude?: boolean
    studentLongitude?: boolean
    distanceFromClass?: boolean
    locationVerified?: boolean
    createdAt?: boolean
  }

  export type StudentAttendanceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type StudentAttendanceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }

  export type $StudentAttendancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StudentAttendance"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      studentId: number
      classId: string
      date: Date
      status: string
      timestamp: string | null
      studentLatitude: number | null
      studentLongitude: number | null
      distanceFromClass: number | null
      locationVerified: boolean
      createdAt: Date
    }, ExtArgs["result"]["studentAttendance"]>
    composites: {}
  }

  type StudentAttendanceGetPayload<S extends boolean | null | undefined | StudentAttendanceDefaultArgs> = $Result.GetResult<Prisma.$StudentAttendancePayload, S>

  type StudentAttendanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StudentAttendanceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StudentAttendanceCountAggregateInputType | true
    }

  export interface StudentAttendanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StudentAttendance'], meta: { name: 'StudentAttendance' } }
    /**
     * Find zero or one StudentAttendance that matches the filter.
     * @param {StudentAttendanceFindUniqueArgs} args - Arguments to find a StudentAttendance
     * @example
     * // Get one StudentAttendance
     * const studentAttendance = await prisma.studentAttendance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentAttendanceFindUniqueArgs>(args: SelectSubset<T, StudentAttendanceFindUniqueArgs<ExtArgs>>): Prisma__StudentAttendanceClient<$Result.GetResult<Prisma.$StudentAttendancePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one StudentAttendance that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StudentAttendanceFindUniqueOrThrowArgs} args - Arguments to find a StudentAttendance
     * @example
     * // Get one StudentAttendance
     * const studentAttendance = await prisma.studentAttendance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentAttendanceFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentAttendanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentAttendanceClient<$Result.GetResult<Prisma.$StudentAttendancePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first StudentAttendance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAttendanceFindFirstArgs} args - Arguments to find a StudentAttendance
     * @example
     * // Get one StudentAttendance
     * const studentAttendance = await prisma.studentAttendance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentAttendanceFindFirstArgs>(args?: SelectSubset<T, StudentAttendanceFindFirstArgs<ExtArgs>>): Prisma__StudentAttendanceClient<$Result.GetResult<Prisma.$StudentAttendancePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first StudentAttendance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAttendanceFindFirstOrThrowArgs} args - Arguments to find a StudentAttendance
     * @example
     * // Get one StudentAttendance
     * const studentAttendance = await prisma.studentAttendance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentAttendanceFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentAttendanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentAttendanceClient<$Result.GetResult<Prisma.$StudentAttendancePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more StudentAttendances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAttendanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StudentAttendances
     * const studentAttendances = await prisma.studentAttendance.findMany()
     * 
     * // Get first 10 StudentAttendances
     * const studentAttendances = await prisma.studentAttendance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const studentAttendanceWithIdOnly = await prisma.studentAttendance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StudentAttendanceFindManyArgs>(args?: SelectSubset<T, StudentAttendanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentAttendancePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a StudentAttendance.
     * @param {StudentAttendanceCreateArgs} args - Arguments to create a StudentAttendance.
     * @example
     * // Create one StudentAttendance
     * const StudentAttendance = await prisma.studentAttendance.create({
     *   data: {
     *     // ... data to create a StudentAttendance
     *   }
     * })
     * 
     */
    create<T extends StudentAttendanceCreateArgs>(args: SelectSubset<T, StudentAttendanceCreateArgs<ExtArgs>>): Prisma__StudentAttendanceClient<$Result.GetResult<Prisma.$StudentAttendancePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many StudentAttendances.
     * @param {StudentAttendanceCreateManyArgs} args - Arguments to create many StudentAttendances.
     * @example
     * // Create many StudentAttendances
     * const studentAttendance = await prisma.studentAttendance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentAttendanceCreateManyArgs>(args?: SelectSubset<T, StudentAttendanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StudentAttendances and returns the data saved in the database.
     * @param {StudentAttendanceCreateManyAndReturnArgs} args - Arguments to create many StudentAttendances.
     * @example
     * // Create many StudentAttendances
     * const studentAttendance = await prisma.studentAttendance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StudentAttendances and only return the `id`
     * const studentAttendanceWithIdOnly = await prisma.studentAttendance.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudentAttendanceCreateManyAndReturnArgs>(args?: SelectSubset<T, StudentAttendanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentAttendancePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a StudentAttendance.
     * @param {StudentAttendanceDeleteArgs} args - Arguments to delete one StudentAttendance.
     * @example
     * // Delete one StudentAttendance
     * const StudentAttendance = await prisma.studentAttendance.delete({
     *   where: {
     *     // ... filter to delete one StudentAttendance
     *   }
     * })
     * 
     */
    delete<T extends StudentAttendanceDeleteArgs>(args: SelectSubset<T, StudentAttendanceDeleteArgs<ExtArgs>>): Prisma__StudentAttendanceClient<$Result.GetResult<Prisma.$StudentAttendancePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one StudentAttendance.
     * @param {StudentAttendanceUpdateArgs} args - Arguments to update one StudentAttendance.
     * @example
     * // Update one StudentAttendance
     * const studentAttendance = await prisma.studentAttendance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentAttendanceUpdateArgs>(args: SelectSubset<T, StudentAttendanceUpdateArgs<ExtArgs>>): Prisma__StudentAttendanceClient<$Result.GetResult<Prisma.$StudentAttendancePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more StudentAttendances.
     * @param {StudentAttendanceDeleteManyArgs} args - Arguments to filter StudentAttendances to delete.
     * @example
     * // Delete a few StudentAttendances
     * const { count } = await prisma.studentAttendance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentAttendanceDeleteManyArgs>(args?: SelectSubset<T, StudentAttendanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StudentAttendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAttendanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StudentAttendances
     * const studentAttendance = await prisma.studentAttendance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentAttendanceUpdateManyArgs>(args: SelectSubset<T, StudentAttendanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one StudentAttendance.
     * @param {StudentAttendanceUpsertArgs} args - Arguments to update or create a StudentAttendance.
     * @example
     * // Update or create a StudentAttendance
     * const studentAttendance = await prisma.studentAttendance.upsert({
     *   create: {
     *     // ... data to create a StudentAttendance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StudentAttendance we want to update
     *   }
     * })
     */
    upsert<T extends StudentAttendanceUpsertArgs>(args: SelectSubset<T, StudentAttendanceUpsertArgs<ExtArgs>>): Prisma__StudentAttendanceClient<$Result.GetResult<Prisma.$StudentAttendancePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of StudentAttendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAttendanceCountArgs} args - Arguments to filter StudentAttendances to count.
     * @example
     * // Count the number of StudentAttendances
     * const count = await prisma.studentAttendance.count({
     *   where: {
     *     // ... the filter for the StudentAttendances we want to count
     *   }
     * })
    **/
    count<T extends StudentAttendanceCountArgs>(
      args?: Subset<T, StudentAttendanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentAttendanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StudentAttendance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAttendanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StudentAttendanceAggregateArgs>(args: Subset<T, StudentAttendanceAggregateArgs>): Prisma.PrismaPromise<GetStudentAttendanceAggregateType<T>>

    /**
     * Group by StudentAttendance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAttendanceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StudentAttendanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentAttendanceGroupByArgs['orderBy'] }
        : { orderBy?: StudentAttendanceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StudentAttendanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentAttendanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StudentAttendance model
   */
  readonly fields: StudentAttendanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StudentAttendance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentAttendanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StudentAttendance model
   */ 
  interface StudentAttendanceFieldRefs {
    readonly id: FieldRef<"StudentAttendance", 'Int'>
    readonly studentId: FieldRef<"StudentAttendance", 'Int'>
    readonly classId: FieldRef<"StudentAttendance", 'String'>
    readonly date: FieldRef<"StudentAttendance", 'DateTime'>
    readonly status: FieldRef<"StudentAttendance", 'String'>
    readonly timestamp: FieldRef<"StudentAttendance", 'String'>
    readonly studentLatitude: FieldRef<"StudentAttendance", 'Float'>
    readonly studentLongitude: FieldRef<"StudentAttendance", 'Float'>
    readonly distanceFromClass: FieldRef<"StudentAttendance", 'Float'>
    readonly locationVerified: FieldRef<"StudentAttendance", 'Boolean'>
    readonly createdAt: FieldRef<"StudentAttendance", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StudentAttendance findUnique
   */
  export type StudentAttendanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAttendance
     */
    select?: StudentAttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAttendanceInclude<ExtArgs> | null
    /**
     * Filter, which StudentAttendance to fetch.
     */
    where: StudentAttendanceWhereUniqueInput
  }

  /**
   * StudentAttendance findUniqueOrThrow
   */
  export type StudentAttendanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAttendance
     */
    select?: StudentAttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAttendanceInclude<ExtArgs> | null
    /**
     * Filter, which StudentAttendance to fetch.
     */
    where: StudentAttendanceWhereUniqueInput
  }

  /**
   * StudentAttendance findFirst
   */
  export type StudentAttendanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAttendance
     */
    select?: StudentAttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAttendanceInclude<ExtArgs> | null
    /**
     * Filter, which StudentAttendance to fetch.
     */
    where?: StudentAttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentAttendances to fetch.
     */
    orderBy?: StudentAttendanceOrderByWithRelationInput | StudentAttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StudentAttendances.
     */
    cursor?: StudentAttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentAttendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentAttendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudentAttendances.
     */
    distinct?: StudentAttendanceScalarFieldEnum | StudentAttendanceScalarFieldEnum[]
  }

  /**
   * StudentAttendance findFirstOrThrow
   */
  export type StudentAttendanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAttendance
     */
    select?: StudentAttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAttendanceInclude<ExtArgs> | null
    /**
     * Filter, which StudentAttendance to fetch.
     */
    where?: StudentAttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentAttendances to fetch.
     */
    orderBy?: StudentAttendanceOrderByWithRelationInput | StudentAttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StudentAttendances.
     */
    cursor?: StudentAttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentAttendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentAttendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudentAttendances.
     */
    distinct?: StudentAttendanceScalarFieldEnum | StudentAttendanceScalarFieldEnum[]
  }

  /**
   * StudentAttendance findMany
   */
  export type StudentAttendanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAttendance
     */
    select?: StudentAttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAttendanceInclude<ExtArgs> | null
    /**
     * Filter, which StudentAttendances to fetch.
     */
    where?: StudentAttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentAttendances to fetch.
     */
    orderBy?: StudentAttendanceOrderByWithRelationInput | StudentAttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StudentAttendances.
     */
    cursor?: StudentAttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentAttendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentAttendances.
     */
    skip?: number
    distinct?: StudentAttendanceScalarFieldEnum | StudentAttendanceScalarFieldEnum[]
  }

  /**
   * StudentAttendance create
   */
  export type StudentAttendanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAttendance
     */
    select?: StudentAttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAttendanceInclude<ExtArgs> | null
    /**
     * The data needed to create a StudentAttendance.
     */
    data: XOR<StudentAttendanceCreateInput, StudentAttendanceUncheckedCreateInput>
  }

  /**
   * StudentAttendance createMany
   */
  export type StudentAttendanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StudentAttendances.
     */
    data: StudentAttendanceCreateManyInput | StudentAttendanceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StudentAttendance createManyAndReturn
   */
  export type StudentAttendanceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAttendance
     */
    select?: StudentAttendanceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many StudentAttendances.
     */
    data: StudentAttendanceCreateManyInput | StudentAttendanceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAttendanceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StudentAttendance update
   */
  export type StudentAttendanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAttendance
     */
    select?: StudentAttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAttendanceInclude<ExtArgs> | null
    /**
     * The data needed to update a StudentAttendance.
     */
    data: XOR<StudentAttendanceUpdateInput, StudentAttendanceUncheckedUpdateInput>
    /**
     * Choose, which StudentAttendance to update.
     */
    where: StudentAttendanceWhereUniqueInput
  }

  /**
   * StudentAttendance updateMany
   */
  export type StudentAttendanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StudentAttendances.
     */
    data: XOR<StudentAttendanceUpdateManyMutationInput, StudentAttendanceUncheckedUpdateManyInput>
    /**
     * Filter which StudentAttendances to update
     */
    where?: StudentAttendanceWhereInput
  }

  /**
   * StudentAttendance upsert
   */
  export type StudentAttendanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAttendance
     */
    select?: StudentAttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAttendanceInclude<ExtArgs> | null
    /**
     * The filter to search for the StudentAttendance to update in case it exists.
     */
    where: StudentAttendanceWhereUniqueInput
    /**
     * In case the StudentAttendance found by the `where` argument doesn't exist, create a new StudentAttendance with this data.
     */
    create: XOR<StudentAttendanceCreateInput, StudentAttendanceUncheckedCreateInput>
    /**
     * In case the StudentAttendance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentAttendanceUpdateInput, StudentAttendanceUncheckedUpdateInput>
  }

  /**
   * StudentAttendance delete
   */
  export type StudentAttendanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAttendance
     */
    select?: StudentAttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAttendanceInclude<ExtArgs> | null
    /**
     * Filter which StudentAttendance to delete.
     */
    where: StudentAttendanceWhereUniqueInput
  }

  /**
   * StudentAttendance deleteMany
   */
  export type StudentAttendanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StudentAttendances to delete
     */
    where?: StudentAttendanceWhereInput
  }

  /**
   * StudentAttendance without action
   */
  export type StudentAttendanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentAttendance
     */
    select?: StudentAttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentAttendanceInclude<ExtArgs> | null
  }


  /**
   * Model Attendance
   */

  export type AggregateAttendance = {
    _count: AttendanceCountAggregateOutputType | null
    _avg: AttendanceAvgAggregateOutputType | null
    _sum: AttendanceSumAggregateOutputType | null
    _min: AttendanceMinAggregateOutputType | null
    _max: AttendanceMaxAggregateOutputType | null
  }

  export type AttendanceAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type AttendanceSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type AttendanceMinAggregateOutputType = {
    id: number | null
    employeeId: string | null
    type: string | null
    timestamp: Date | null
    userId: number | null
    createdAt: Date | null
  }

  export type AttendanceMaxAggregateOutputType = {
    id: number | null
    employeeId: string | null
    type: string | null
    timestamp: Date | null
    userId: number | null
    createdAt: Date | null
  }

  export type AttendanceCountAggregateOutputType = {
    id: number
    employeeId: number
    type: number
    timestamp: number
    userId: number
    createdAt: number
    _all: number
  }


  export type AttendanceAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type AttendanceSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type AttendanceMinAggregateInputType = {
    id?: true
    employeeId?: true
    type?: true
    timestamp?: true
    userId?: true
    createdAt?: true
  }

  export type AttendanceMaxAggregateInputType = {
    id?: true
    employeeId?: true
    type?: true
    timestamp?: true
    userId?: true
    createdAt?: true
  }

  export type AttendanceCountAggregateInputType = {
    id?: true
    employeeId?: true
    type?: true
    timestamp?: true
    userId?: true
    createdAt?: true
    _all?: true
  }

  export type AttendanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attendance to aggregate.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Attendances
    **/
    _count?: true | AttendanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AttendanceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AttendanceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttendanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttendanceMaxAggregateInputType
  }

  export type GetAttendanceAggregateType<T extends AttendanceAggregateArgs> = {
        [P in keyof T & keyof AggregateAttendance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttendance[P]>
      : GetScalarType<T[P], AggregateAttendance[P]>
  }




  export type AttendanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendanceWhereInput
    orderBy?: AttendanceOrderByWithAggregationInput | AttendanceOrderByWithAggregationInput[]
    by: AttendanceScalarFieldEnum[] | AttendanceScalarFieldEnum
    having?: AttendanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttendanceCountAggregateInputType | true
    _avg?: AttendanceAvgAggregateInputType
    _sum?: AttendanceSumAggregateInputType
    _min?: AttendanceMinAggregateInputType
    _max?: AttendanceMaxAggregateInputType
  }

  export type AttendanceGroupByOutputType = {
    id: number
    employeeId: string
    type: string
    timestamp: Date
    userId: number
    createdAt: Date
    _count: AttendanceCountAggregateOutputType | null
    _avg: AttendanceAvgAggregateOutputType | null
    _sum: AttendanceSumAggregateOutputType | null
    _min: AttendanceMinAggregateOutputType | null
    _max: AttendanceMaxAggregateOutputType | null
  }

  type GetAttendanceGroupByPayload<T extends AttendanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AttendanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttendanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttendanceGroupByOutputType[P]>
            : GetScalarType<T[P], AttendanceGroupByOutputType[P]>
        }
      >
    >


  export type AttendanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    type?: boolean
    timestamp?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attendance"]>

  export type AttendanceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeId?: boolean
    type?: boolean
    timestamp?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attendance"]>

  export type AttendanceSelectScalar = {
    id?: boolean
    employeeId?: boolean
    type?: boolean
    timestamp?: boolean
    userId?: boolean
    createdAt?: boolean
  }

  export type AttendanceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AttendanceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AttendancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Attendance"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      employeeId: string
      type: string
      timestamp: Date
      userId: number
      createdAt: Date
    }, ExtArgs["result"]["attendance"]>
    composites: {}
  }

  type AttendanceGetPayload<S extends boolean | null | undefined | AttendanceDefaultArgs> = $Result.GetResult<Prisma.$AttendancePayload, S>

  type AttendanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AttendanceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AttendanceCountAggregateInputType | true
    }

  export interface AttendanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Attendance'], meta: { name: 'Attendance' } }
    /**
     * Find zero or one Attendance that matches the filter.
     * @param {AttendanceFindUniqueArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AttendanceFindUniqueArgs>(args: SelectSubset<T, AttendanceFindUniqueArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Attendance that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AttendanceFindUniqueOrThrowArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AttendanceFindUniqueOrThrowArgs>(args: SelectSubset<T, AttendanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Attendance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceFindFirstArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AttendanceFindFirstArgs>(args?: SelectSubset<T, AttendanceFindFirstArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Attendance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceFindFirstOrThrowArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AttendanceFindFirstOrThrowArgs>(args?: SelectSubset<T, AttendanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Attendances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Attendances
     * const attendances = await prisma.attendance.findMany()
     * 
     * // Get first 10 Attendances
     * const attendances = await prisma.attendance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attendanceWithIdOnly = await prisma.attendance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AttendanceFindManyArgs>(args?: SelectSubset<T, AttendanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Attendance.
     * @param {AttendanceCreateArgs} args - Arguments to create a Attendance.
     * @example
     * // Create one Attendance
     * const Attendance = await prisma.attendance.create({
     *   data: {
     *     // ... data to create a Attendance
     *   }
     * })
     * 
     */
    create<T extends AttendanceCreateArgs>(args: SelectSubset<T, AttendanceCreateArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Attendances.
     * @param {AttendanceCreateManyArgs} args - Arguments to create many Attendances.
     * @example
     * // Create many Attendances
     * const attendance = await prisma.attendance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AttendanceCreateManyArgs>(args?: SelectSubset<T, AttendanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Attendances and returns the data saved in the database.
     * @param {AttendanceCreateManyAndReturnArgs} args - Arguments to create many Attendances.
     * @example
     * // Create many Attendances
     * const attendance = await prisma.attendance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Attendances and only return the `id`
     * const attendanceWithIdOnly = await prisma.attendance.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AttendanceCreateManyAndReturnArgs>(args?: SelectSubset<T, AttendanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Attendance.
     * @param {AttendanceDeleteArgs} args - Arguments to delete one Attendance.
     * @example
     * // Delete one Attendance
     * const Attendance = await prisma.attendance.delete({
     *   where: {
     *     // ... filter to delete one Attendance
     *   }
     * })
     * 
     */
    delete<T extends AttendanceDeleteArgs>(args: SelectSubset<T, AttendanceDeleteArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Attendance.
     * @param {AttendanceUpdateArgs} args - Arguments to update one Attendance.
     * @example
     * // Update one Attendance
     * const attendance = await prisma.attendance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AttendanceUpdateArgs>(args: SelectSubset<T, AttendanceUpdateArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Attendances.
     * @param {AttendanceDeleteManyArgs} args - Arguments to filter Attendances to delete.
     * @example
     * // Delete a few Attendances
     * const { count } = await prisma.attendance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AttendanceDeleteManyArgs>(args?: SelectSubset<T, AttendanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Attendances
     * const attendance = await prisma.attendance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AttendanceUpdateManyArgs>(args: SelectSubset<T, AttendanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Attendance.
     * @param {AttendanceUpsertArgs} args - Arguments to update or create a Attendance.
     * @example
     * // Update or create a Attendance
     * const attendance = await prisma.attendance.upsert({
     *   create: {
     *     // ... data to create a Attendance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Attendance we want to update
     *   }
     * })
     */
    upsert<T extends AttendanceUpsertArgs>(args: SelectSubset<T, AttendanceUpsertArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Attendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceCountArgs} args - Arguments to filter Attendances to count.
     * @example
     * // Count the number of Attendances
     * const count = await prisma.attendance.count({
     *   where: {
     *     // ... the filter for the Attendances we want to count
     *   }
     * })
    **/
    count<T extends AttendanceCountArgs>(
      args?: Subset<T, AttendanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttendanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Attendance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AttendanceAggregateArgs>(args: Subset<T, AttendanceAggregateArgs>): Prisma.PrismaPromise<GetAttendanceAggregateType<T>>

    /**
     * Group by Attendance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AttendanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AttendanceGroupByArgs['orderBy'] }
        : { orderBy?: AttendanceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AttendanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttendanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Attendance model
   */
  readonly fields: AttendanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Attendance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AttendanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Attendance model
   */ 
  interface AttendanceFieldRefs {
    readonly id: FieldRef<"Attendance", 'Int'>
    readonly employeeId: FieldRef<"Attendance", 'String'>
    readonly type: FieldRef<"Attendance", 'String'>
    readonly timestamp: FieldRef<"Attendance", 'DateTime'>
    readonly userId: FieldRef<"Attendance", 'Int'>
    readonly createdAt: FieldRef<"Attendance", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Attendance findUnique
   */
  export type AttendanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance findUniqueOrThrow
   */
  export type AttendanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance findFirst
   */
  export type AttendanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attendances.
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attendances.
     */
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * Attendance findFirstOrThrow
   */
  export type AttendanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attendances.
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attendances.
     */
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * Attendance findMany
   */
  export type AttendanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendances to fetch.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Attendances.
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * Attendance create
   */
  export type AttendanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * The data needed to create a Attendance.
     */
    data: XOR<AttendanceCreateInput, AttendanceUncheckedCreateInput>
  }

  /**
   * Attendance createMany
   */
  export type AttendanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Attendances.
     */
    data: AttendanceCreateManyInput | AttendanceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Attendance createManyAndReturn
   */
  export type AttendanceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Attendances.
     */
    data: AttendanceCreateManyInput | AttendanceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Attendance update
   */
  export type AttendanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * The data needed to update a Attendance.
     */
    data: XOR<AttendanceUpdateInput, AttendanceUncheckedUpdateInput>
    /**
     * Choose, which Attendance to update.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance updateMany
   */
  export type AttendanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Attendances.
     */
    data: XOR<AttendanceUpdateManyMutationInput, AttendanceUncheckedUpdateManyInput>
    /**
     * Filter which Attendances to update
     */
    where?: AttendanceWhereInput
  }

  /**
   * Attendance upsert
   */
  export type AttendanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * The filter to search for the Attendance to update in case it exists.
     */
    where: AttendanceWhereUniqueInput
    /**
     * In case the Attendance found by the `where` argument doesn't exist, create a new Attendance with this data.
     */
    create: XOR<AttendanceCreateInput, AttendanceUncheckedCreateInput>
    /**
     * In case the Attendance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AttendanceUpdateInput, AttendanceUncheckedUpdateInput>
  }

  /**
   * Attendance delete
   */
  export type AttendanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter which Attendance to delete.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance deleteMany
   */
  export type AttendanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attendances to delete
     */
    where?: AttendanceWhereInput
  }

  /**
   * Attendance without action
   */
  export type AttendanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
  }


  /**
   * Model Class
   */

  export type AggregateClass = {
    _count: ClassCountAggregateOutputType | null
    _avg: ClassAvgAggregateOutputType | null
    _sum: ClassSumAggregateOutputType | null
    _min: ClassMinAggregateOutputType | null
    _max: ClassMaxAggregateOutputType | null
  }

  export type ClassAvgAggregateOutputType = {
    id: number | null
    maxStudents: number | null
    latitude: number | null
    longitude: number | null
    geofenceRadius: number | null
    createdBy: number | null
  }

  export type ClassSumAggregateOutputType = {
    id: number | null
    maxStudents: number | null
    latitude: number | null
    longitude: number | null
    geofenceRadius: number | null
    createdBy: number | null
  }

  export type ClassMinAggregateOutputType = {
    id: number | null
    name: string | null
    code: string | null
    faculty: string | null
    maxStudents: number | null
    schedule: string | null
    room: string | null
    latitude: number | null
    longitude: number | null
    geofenceRadius: number | null
    geofenceEnabled: boolean | null
    createdBy: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClassMaxAggregateOutputType = {
    id: number | null
    name: string | null
    code: string | null
    faculty: string | null
    maxStudents: number | null
    schedule: string | null
    room: string | null
    latitude: number | null
    longitude: number | null
    geofenceRadius: number | null
    geofenceEnabled: boolean | null
    createdBy: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClassCountAggregateOutputType = {
    id: number
    name: number
    code: number
    faculty: number
    maxStudents: number
    schedule: number
    room: number
    latitude: number
    longitude: number
    geofenceRadius: number
    geofenceEnabled: number
    createdBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClassAvgAggregateInputType = {
    id?: true
    maxStudents?: true
    latitude?: true
    longitude?: true
    geofenceRadius?: true
    createdBy?: true
  }

  export type ClassSumAggregateInputType = {
    id?: true
    maxStudents?: true
    latitude?: true
    longitude?: true
    geofenceRadius?: true
    createdBy?: true
  }

  export type ClassMinAggregateInputType = {
    id?: true
    name?: true
    code?: true
    faculty?: true
    maxStudents?: true
    schedule?: true
    room?: true
    latitude?: true
    longitude?: true
    geofenceRadius?: true
    geofenceEnabled?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClassMaxAggregateInputType = {
    id?: true
    name?: true
    code?: true
    faculty?: true
    maxStudents?: true
    schedule?: true
    room?: true
    latitude?: true
    longitude?: true
    geofenceRadius?: true
    geofenceEnabled?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClassCountAggregateInputType = {
    id?: true
    name?: true
    code?: true
    faculty?: true
    maxStudents?: true
    schedule?: true
    room?: true
    latitude?: true
    longitude?: true
    geofenceRadius?: true
    geofenceEnabled?: true
    createdBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClassAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Class to aggregate.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Classes
    **/
    _count?: true | ClassCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClassAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClassSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClassMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClassMaxAggregateInputType
  }

  export type GetClassAggregateType<T extends ClassAggregateArgs> = {
        [P in keyof T & keyof AggregateClass]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClass[P]>
      : GetScalarType<T[P], AggregateClass[P]>
  }




  export type ClassGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClassWhereInput
    orderBy?: ClassOrderByWithAggregationInput | ClassOrderByWithAggregationInput[]
    by: ClassScalarFieldEnum[] | ClassScalarFieldEnum
    having?: ClassScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClassCountAggregateInputType | true
    _avg?: ClassAvgAggregateInputType
    _sum?: ClassSumAggregateInputType
    _min?: ClassMinAggregateInputType
    _max?: ClassMaxAggregateInputType
  }

  export type ClassGroupByOutputType = {
    id: number
    name: string
    code: string
    faculty: string
    maxStudents: number | null
    schedule: string | null
    room: string | null
    latitude: number | null
    longitude: number | null
    geofenceRadius: number
    geofenceEnabled: boolean
    createdBy: number | null
    createdAt: Date
    updatedAt: Date
    _count: ClassCountAggregateOutputType | null
    _avg: ClassAvgAggregateOutputType | null
    _sum: ClassSumAggregateOutputType | null
    _min: ClassMinAggregateOutputType | null
    _max: ClassMaxAggregateOutputType | null
  }

  type GetClassGroupByPayload<T extends ClassGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClassGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClassGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClassGroupByOutputType[P]>
            : GetScalarType<T[P], ClassGroupByOutputType[P]>
        }
      >
    >


  export type ClassSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    faculty?: boolean
    maxStudents?: boolean
    schedule?: boolean
    room?: boolean
    latitude?: boolean
    longitude?: boolean
    geofenceRadius?: boolean
    geofenceEnabled?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["class"]>

  export type ClassSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    faculty?: boolean
    maxStudents?: boolean
    schedule?: boolean
    room?: boolean
    latitude?: boolean
    longitude?: boolean
    geofenceRadius?: boolean
    geofenceEnabled?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["class"]>

  export type ClassSelectScalar = {
    id?: boolean
    name?: boolean
    code?: boolean
    faculty?: boolean
    maxStudents?: boolean
    schedule?: boolean
    room?: boolean
    latitude?: boolean
    longitude?: boolean
    geofenceRadius?: boolean
    geofenceEnabled?: boolean
    createdBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $ClassPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Class"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      code: string
      faculty: string
      maxStudents: number | null
      schedule: string | null
      room: string | null
      latitude: number | null
      longitude: number | null
      geofenceRadius: number
      geofenceEnabled: boolean
      createdBy: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["class"]>
    composites: {}
  }

  type ClassGetPayload<S extends boolean | null | undefined | ClassDefaultArgs> = $Result.GetResult<Prisma.$ClassPayload, S>

  type ClassCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ClassFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ClassCountAggregateInputType | true
    }

  export interface ClassDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Class'], meta: { name: 'Class' } }
    /**
     * Find zero or one Class that matches the filter.
     * @param {ClassFindUniqueArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClassFindUniqueArgs>(args: SelectSubset<T, ClassFindUniqueArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Class that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ClassFindUniqueOrThrowArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClassFindUniqueOrThrowArgs>(args: SelectSubset<T, ClassFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Class that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassFindFirstArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClassFindFirstArgs>(args?: SelectSubset<T, ClassFindFirstArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Class that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassFindFirstOrThrowArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClassFindFirstOrThrowArgs>(args?: SelectSubset<T, ClassFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Classes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Classes
     * const classes = await prisma.class.findMany()
     * 
     * // Get first 10 Classes
     * const classes = await prisma.class.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const classWithIdOnly = await prisma.class.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClassFindManyArgs>(args?: SelectSubset<T, ClassFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Class.
     * @param {ClassCreateArgs} args - Arguments to create a Class.
     * @example
     * // Create one Class
     * const Class = await prisma.class.create({
     *   data: {
     *     // ... data to create a Class
     *   }
     * })
     * 
     */
    create<T extends ClassCreateArgs>(args: SelectSubset<T, ClassCreateArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Classes.
     * @param {ClassCreateManyArgs} args - Arguments to create many Classes.
     * @example
     * // Create many Classes
     * const class = await prisma.class.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClassCreateManyArgs>(args?: SelectSubset<T, ClassCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Classes and returns the data saved in the database.
     * @param {ClassCreateManyAndReturnArgs} args - Arguments to create many Classes.
     * @example
     * // Create many Classes
     * const class = await prisma.class.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Classes and only return the `id`
     * const classWithIdOnly = await prisma.class.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClassCreateManyAndReturnArgs>(args?: SelectSubset<T, ClassCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Class.
     * @param {ClassDeleteArgs} args - Arguments to delete one Class.
     * @example
     * // Delete one Class
     * const Class = await prisma.class.delete({
     *   where: {
     *     // ... filter to delete one Class
     *   }
     * })
     * 
     */
    delete<T extends ClassDeleteArgs>(args: SelectSubset<T, ClassDeleteArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Class.
     * @param {ClassUpdateArgs} args - Arguments to update one Class.
     * @example
     * // Update one Class
     * const class = await prisma.class.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClassUpdateArgs>(args: SelectSubset<T, ClassUpdateArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Classes.
     * @param {ClassDeleteManyArgs} args - Arguments to filter Classes to delete.
     * @example
     * // Delete a few Classes
     * const { count } = await prisma.class.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClassDeleteManyArgs>(args?: SelectSubset<T, ClassDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Classes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Classes
     * const class = await prisma.class.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClassUpdateManyArgs>(args: SelectSubset<T, ClassUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Class.
     * @param {ClassUpsertArgs} args - Arguments to update or create a Class.
     * @example
     * // Update or create a Class
     * const class = await prisma.class.upsert({
     *   create: {
     *     // ... data to create a Class
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Class we want to update
     *   }
     * })
     */
    upsert<T extends ClassUpsertArgs>(args: SelectSubset<T, ClassUpsertArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Classes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassCountArgs} args - Arguments to filter Classes to count.
     * @example
     * // Count the number of Classes
     * const count = await prisma.class.count({
     *   where: {
     *     // ... the filter for the Classes we want to count
     *   }
     * })
    **/
    count<T extends ClassCountArgs>(
      args?: Subset<T, ClassCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClassCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Class.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClassAggregateArgs>(args: Subset<T, ClassAggregateArgs>): Prisma.PrismaPromise<GetClassAggregateType<T>>

    /**
     * Group by Class.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClassGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClassGroupByArgs['orderBy'] }
        : { orderBy?: ClassGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClassGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClassGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Class model
   */
  readonly fields: ClassFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Class.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClassClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Class model
   */ 
  interface ClassFieldRefs {
    readonly id: FieldRef<"Class", 'Int'>
    readonly name: FieldRef<"Class", 'String'>
    readonly code: FieldRef<"Class", 'String'>
    readonly faculty: FieldRef<"Class", 'String'>
    readonly maxStudents: FieldRef<"Class", 'Int'>
    readonly schedule: FieldRef<"Class", 'String'>
    readonly room: FieldRef<"Class", 'String'>
    readonly latitude: FieldRef<"Class", 'Float'>
    readonly longitude: FieldRef<"Class", 'Float'>
    readonly geofenceRadius: FieldRef<"Class", 'Int'>
    readonly geofenceEnabled: FieldRef<"Class", 'Boolean'>
    readonly createdBy: FieldRef<"Class", 'Int'>
    readonly createdAt: FieldRef<"Class", 'DateTime'>
    readonly updatedAt: FieldRef<"Class", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Class findUnique
   */
  export type ClassFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class findUniqueOrThrow
   */
  export type ClassFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class findFirst
   */
  export type ClassFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Classes.
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Classes.
     */
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[]
  }

  /**
   * Class findFirstOrThrow
   */
  export type ClassFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Classes.
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Classes.
     */
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[]
  }

  /**
   * Class findMany
   */
  export type ClassFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Filter, which Classes to fetch.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Classes.
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[]
  }

  /**
   * Class create
   */
  export type ClassCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * The data needed to create a Class.
     */
    data: XOR<ClassCreateInput, ClassUncheckedCreateInput>
  }

  /**
   * Class createMany
   */
  export type ClassCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Classes.
     */
    data: ClassCreateManyInput | ClassCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Class createManyAndReturn
   */
  export type ClassCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Classes.
     */
    data: ClassCreateManyInput | ClassCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Class update
   */
  export type ClassUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * The data needed to update a Class.
     */
    data: XOR<ClassUpdateInput, ClassUncheckedUpdateInput>
    /**
     * Choose, which Class to update.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class updateMany
   */
  export type ClassUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Classes.
     */
    data: XOR<ClassUpdateManyMutationInput, ClassUncheckedUpdateManyInput>
    /**
     * Filter which Classes to update
     */
    where?: ClassWhereInput
  }

  /**
   * Class upsert
   */
  export type ClassUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * The filter to search for the Class to update in case it exists.
     */
    where: ClassWhereUniqueInput
    /**
     * In case the Class found by the `where` argument doesn't exist, create a new Class with this data.
     */
    create: XOR<ClassCreateInput, ClassUncheckedCreateInput>
    /**
     * In case the Class was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClassUpdateInput, ClassUncheckedUpdateInput>
  }

  /**
   * Class delete
   */
  export type ClassDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Filter which Class to delete.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class deleteMany
   */
  export type ClassDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Classes to delete
     */
    where?: ClassWhereInput
  }

  /**
   * Class without action
   */
  export type ClassDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
  }


  /**
   * Model QRSession
   */

  export type AggregateQRSession = {
    _count: QRSessionCountAggregateOutputType | null
    _avg: QRSessionAvgAggregateOutputType | null
    _sum: QRSessionSumAggregateOutputType | null
    _min: QRSessionMinAggregateOutputType | null
    _max: QRSessionMaxAggregateOutputType | null
  }

  export type QRSessionAvgAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    radius: number | null
  }

  export type QRSessionSumAggregateOutputType = {
    latitude: number | null
    longitude: number | null
    radius: number | null
  }

  export type QRSessionMinAggregateOutputType = {
    id: string | null
    classId: string | null
    className: string | null
    latitude: number | null
    longitude: number | null
    radius: number | null
    createdBy: string | null
    createdAt: Date | null
    expiresAt: Date | null
    isActive: boolean | null
  }

  export type QRSessionMaxAggregateOutputType = {
    id: string | null
    classId: string | null
    className: string | null
    latitude: number | null
    longitude: number | null
    radius: number | null
    createdBy: string | null
    createdAt: Date | null
    expiresAt: Date | null
    isActive: boolean | null
  }

  export type QRSessionCountAggregateOutputType = {
    id: number
    classId: number
    className: number
    latitude: number
    longitude: number
    radius: number
    createdBy: number
    createdAt: number
    expiresAt: number
    isActive: number
    _all: number
  }


  export type QRSessionAvgAggregateInputType = {
    latitude?: true
    longitude?: true
    radius?: true
  }

  export type QRSessionSumAggregateInputType = {
    latitude?: true
    longitude?: true
    radius?: true
  }

  export type QRSessionMinAggregateInputType = {
    id?: true
    classId?: true
    className?: true
    latitude?: true
    longitude?: true
    radius?: true
    createdBy?: true
    createdAt?: true
    expiresAt?: true
    isActive?: true
  }

  export type QRSessionMaxAggregateInputType = {
    id?: true
    classId?: true
    className?: true
    latitude?: true
    longitude?: true
    radius?: true
    createdBy?: true
    createdAt?: true
    expiresAt?: true
    isActive?: true
  }

  export type QRSessionCountAggregateInputType = {
    id?: true
    classId?: true
    className?: true
    latitude?: true
    longitude?: true
    radius?: true
    createdBy?: true
    createdAt?: true
    expiresAt?: true
    isActive?: true
    _all?: true
  }

  export type QRSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QRSession to aggregate.
     */
    where?: QRSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QRSessions to fetch.
     */
    orderBy?: QRSessionOrderByWithRelationInput | QRSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QRSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QRSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QRSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QRSessions
    **/
    _count?: true | QRSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QRSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QRSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QRSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QRSessionMaxAggregateInputType
  }

  export type GetQRSessionAggregateType<T extends QRSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateQRSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQRSession[P]>
      : GetScalarType<T[P], AggregateQRSession[P]>
  }




  export type QRSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QRSessionWhereInput
    orderBy?: QRSessionOrderByWithAggregationInput | QRSessionOrderByWithAggregationInput[]
    by: QRSessionScalarFieldEnum[] | QRSessionScalarFieldEnum
    having?: QRSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QRSessionCountAggregateInputType | true
    _avg?: QRSessionAvgAggregateInputType
    _sum?: QRSessionSumAggregateInputType
    _min?: QRSessionMinAggregateInputType
    _max?: QRSessionMaxAggregateInputType
  }

  export type QRSessionGroupByOutputType = {
    id: string
    classId: string
    className: string
    latitude: number | null
    longitude: number | null
    radius: number
    createdBy: string | null
    createdAt: Date
    expiresAt: Date
    isActive: boolean
    _count: QRSessionCountAggregateOutputType | null
    _avg: QRSessionAvgAggregateOutputType | null
    _sum: QRSessionSumAggregateOutputType | null
    _min: QRSessionMinAggregateOutputType | null
    _max: QRSessionMaxAggregateOutputType | null
  }

  type GetQRSessionGroupByPayload<T extends QRSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QRSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QRSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QRSessionGroupByOutputType[P]>
            : GetScalarType<T[P], QRSessionGroupByOutputType[P]>
        }
      >
    >


  export type QRSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    classId?: boolean
    className?: boolean
    latitude?: boolean
    longitude?: boolean
    radius?: boolean
    createdBy?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["qRSession"]>

  export type QRSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    classId?: boolean
    className?: boolean
    latitude?: boolean
    longitude?: boolean
    radius?: boolean
    createdBy?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    isActive?: boolean
  }, ExtArgs["result"]["qRSession"]>

  export type QRSessionSelectScalar = {
    id?: boolean
    classId?: boolean
    className?: boolean
    latitude?: boolean
    longitude?: boolean
    radius?: boolean
    createdBy?: boolean
    createdAt?: boolean
    expiresAt?: boolean
    isActive?: boolean
  }


  export type $QRSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QRSession"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      classId: string
      className: string
      latitude: number | null
      longitude: number | null
      radius: number
      createdBy: string | null
      createdAt: Date
      expiresAt: Date
      isActive: boolean
    }, ExtArgs["result"]["qRSession"]>
    composites: {}
  }

  type QRSessionGetPayload<S extends boolean | null | undefined | QRSessionDefaultArgs> = $Result.GetResult<Prisma.$QRSessionPayload, S>

  type QRSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<QRSessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: QRSessionCountAggregateInputType | true
    }

  export interface QRSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QRSession'], meta: { name: 'QRSession' } }
    /**
     * Find zero or one QRSession that matches the filter.
     * @param {QRSessionFindUniqueArgs} args - Arguments to find a QRSession
     * @example
     * // Get one QRSession
     * const qRSession = await prisma.qRSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QRSessionFindUniqueArgs>(args: SelectSubset<T, QRSessionFindUniqueArgs<ExtArgs>>): Prisma__QRSessionClient<$Result.GetResult<Prisma.$QRSessionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one QRSession that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {QRSessionFindUniqueOrThrowArgs} args - Arguments to find a QRSession
     * @example
     * // Get one QRSession
     * const qRSession = await prisma.qRSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QRSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, QRSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QRSessionClient<$Result.GetResult<Prisma.$QRSessionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first QRSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRSessionFindFirstArgs} args - Arguments to find a QRSession
     * @example
     * // Get one QRSession
     * const qRSession = await prisma.qRSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QRSessionFindFirstArgs>(args?: SelectSubset<T, QRSessionFindFirstArgs<ExtArgs>>): Prisma__QRSessionClient<$Result.GetResult<Prisma.$QRSessionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first QRSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRSessionFindFirstOrThrowArgs} args - Arguments to find a QRSession
     * @example
     * // Get one QRSession
     * const qRSession = await prisma.qRSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QRSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, QRSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__QRSessionClient<$Result.GetResult<Prisma.$QRSessionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more QRSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QRSessions
     * const qRSessions = await prisma.qRSession.findMany()
     * 
     * // Get first 10 QRSessions
     * const qRSessions = await prisma.qRSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const qRSessionWithIdOnly = await prisma.qRSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QRSessionFindManyArgs>(args?: SelectSubset<T, QRSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QRSessionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a QRSession.
     * @param {QRSessionCreateArgs} args - Arguments to create a QRSession.
     * @example
     * // Create one QRSession
     * const QRSession = await prisma.qRSession.create({
     *   data: {
     *     // ... data to create a QRSession
     *   }
     * })
     * 
     */
    create<T extends QRSessionCreateArgs>(args: SelectSubset<T, QRSessionCreateArgs<ExtArgs>>): Prisma__QRSessionClient<$Result.GetResult<Prisma.$QRSessionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many QRSessions.
     * @param {QRSessionCreateManyArgs} args - Arguments to create many QRSessions.
     * @example
     * // Create many QRSessions
     * const qRSession = await prisma.qRSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QRSessionCreateManyArgs>(args?: SelectSubset<T, QRSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QRSessions and returns the data saved in the database.
     * @param {QRSessionCreateManyAndReturnArgs} args - Arguments to create many QRSessions.
     * @example
     * // Create many QRSessions
     * const qRSession = await prisma.qRSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QRSessions and only return the `id`
     * const qRSessionWithIdOnly = await prisma.qRSession.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QRSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, QRSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QRSessionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a QRSession.
     * @param {QRSessionDeleteArgs} args - Arguments to delete one QRSession.
     * @example
     * // Delete one QRSession
     * const QRSession = await prisma.qRSession.delete({
     *   where: {
     *     // ... filter to delete one QRSession
     *   }
     * })
     * 
     */
    delete<T extends QRSessionDeleteArgs>(args: SelectSubset<T, QRSessionDeleteArgs<ExtArgs>>): Prisma__QRSessionClient<$Result.GetResult<Prisma.$QRSessionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one QRSession.
     * @param {QRSessionUpdateArgs} args - Arguments to update one QRSession.
     * @example
     * // Update one QRSession
     * const qRSession = await prisma.qRSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QRSessionUpdateArgs>(args: SelectSubset<T, QRSessionUpdateArgs<ExtArgs>>): Prisma__QRSessionClient<$Result.GetResult<Prisma.$QRSessionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more QRSessions.
     * @param {QRSessionDeleteManyArgs} args - Arguments to filter QRSessions to delete.
     * @example
     * // Delete a few QRSessions
     * const { count } = await prisma.qRSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QRSessionDeleteManyArgs>(args?: SelectSubset<T, QRSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QRSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QRSessions
     * const qRSession = await prisma.qRSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QRSessionUpdateManyArgs>(args: SelectSubset<T, QRSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one QRSession.
     * @param {QRSessionUpsertArgs} args - Arguments to update or create a QRSession.
     * @example
     * // Update or create a QRSession
     * const qRSession = await prisma.qRSession.upsert({
     *   create: {
     *     // ... data to create a QRSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QRSession we want to update
     *   }
     * })
     */
    upsert<T extends QRSessionUpsertArgs>(args: SelectSubset<T, QRSessionUpsertArgs<ExtArgs>>): Prisma__QRSessionClient<$Result.GetResult<Prisma.$QRSessionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of QRSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRSessionCountArgs} args - Arguments to filter QRSessions to count.
     * @example
     * // Count the number of QRSessions
     * const count = await prisma.qRSession.count({
     *   where: {
     *     // ... the filter for the QRSessions we want to count
     *   }
     * })
    **/
    count<T extends QRSessionCountArgs>(
      args?: Subset<T, QRSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QRSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QRSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QRSessionAggregateArgs>(args: Subset<T, QRSessionAggregateArgs>): Prisma.PrismaPromise<GetQRSessionAggregateType<T>>

    /**
     * Group by QRSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QRSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QRSessionGroupByArgs['orderBy'] }
        : { orderBy?: QRSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QRSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQRSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QRSession model
   */
  readonly fields: QRSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QRSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QRSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QRSession model
   */ 
  interface QRSessionFieldRefs {
    readonly id: FieldRef<"QRSession", 'String'>
    readonly classId: FieldRef<"QRSession", 'String'>
    readonly className: FieldRef<"QRSession", 'String'>
    readonly latitude: FieldRef<"QRSession", 'Float'>
    readonly longitude: FieldRef<"QRSession", 'Float'>
    readonly radius: FieldRef<"QRSession", 'Int'>
    readonly createdBy: FieldRef<"QRSession", 'String'>
    readonly createdAt: FieldRef<"QRSession", 'DateTime'>
    readonly expiresAt: FieldRef<"QRSession", 'DateTime'>
    readonly isActive: FieldRef<"QRSession", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * QRSession findUnique
   */
  export type QRSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRSession
     */
    select?: QRSessionSelect<ExtArgs> | null
    /**
     * Filter, which QRSession to fetch.
     */
    where: QRSessionWhereUniqueInput
  }

  /**
   * QRSession findUniqueOrThrow
   */
  export type QRSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRSession
     */
    select?: QRSessionSelect<ExtArgs> | null
    /**
     * Filter, which QRSession to fetch.
     */
    where: QRSessionWhereUniqueInput
  }

  /**
   * QRSession findFirst
   */
  export type QRSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRSession
     */
    select?: QRSessionSelect<ExtArgs> | null
    /**
     * Filter, which QRSession to fetch.
     */
    where?: QRSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QRSessions to fetch.
     */
    orderBy?: QRSessionOrderByWithRelationInput | QRSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QRSessions.
     */
    cursor?: QRSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QRSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QRSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QRSessions.
     */
    distinct?: QRSessionScalarFieldEnum | QRSessionScalarFieldEnum[]
  }

  /**
   * QRSession findFirstOrThrow
   */
  export type QRSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRSession
     */
    select?: QRSessionSelect<ExtArgs> | null
    /**
     * Filter, which QRSession to fetch.
     */
    where?: QRSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QRSessions to fetch.
     */
    orderBy?: QRSessionOrderByWithRelationInput | QRSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QRSessions.
     */
    cursor?: QRSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QRSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QRSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QRSessions.
     */
    distinct?: QRSessionScalarFieldEnum | QRSessionScalarFieldEnum[]
  }

  /**
   * QRSession findMany
   */
  export type QRSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRSession
     */
    select?: QRSessionSelect<ExtArgs> | null
    /**
     * Filter, which QRSessions to fetch.
     */
    where?: QRSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QRSessions to fetch.
     */
    orderBy?: QRSessionOrderByWithRelationInput | QRSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QRSessions.
     */
    cursor?: QRSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QRSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QRSessions.
     */
    skip?: number
    distinct?: QRSessionScalarFieldEnum | QRSessionScalarFieldEnum[]
  }

  /**
   * QRSession create
   */
  export type QRSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRSession
     */
    select?: QRSessionSelect<ExtArgs> | null
    /**
     * The data needed to create a QRSession.
     */
    data: XOR<QRSessionCreateInput, QRSessionUncheckedCreateInput>
  }

  /**
   * QRSession createMany
   */
  export type QRSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QRSessions.
     */
    data: QRSessionCreateManyInput | QRSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QRSession createManyAndReturn
   */
  export type QRSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRSession
     */
    select?: QRSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many QRSessions.
     */
    data: QRSessionCreateManyInput | QRSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QRSession update
   */
  export type QRSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRSession
     */
    select?: QRSessionSelect<ExtArgs> | null
    /**
     * The data needed to update a QRSession.
     */
    data: XOR<QRSessionUpdateInput, QRSessionUncheckedUpdateInput>
    /**
     * Choose, which QRSession to update.
     */
    where: QRSessionWhereUniqueInput
  }

  /**
   * QRSession updateMany
   */
  export type QRSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QRSessions.
     */
    data: XOR<QRSessionUpdateManyMutationInput, QRSessionUncheckedUpdateManyInput>
    /**
     * Filter which QRSessions to update
     */
    where?: QRSessionWhereInput
  }

  /**
   * QRSession upsert
   */
  export type QRSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRSession
     */
    select?: QRSessionSelect<ExtArgs> | null
    /**
     * The filter to search for the QRSession to update in case it exists.
     */
    where: QRSessionWhereUniqueInput
    /**
     * In case the QRSession found by the `where` argument doesn't exist, create a new QRSession with this data.
     */
    create: XOR<QRSessionCreateInput, QRSessionUncheckedCreateInput>
    /**
     * In case the QRSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QRSessionUpdateInput, QRSessionUncheckedUpdateInput>
  }

  /**
   * QRSession delete
   */
  export type QRSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRSession
     */
    select?: QRSessionSelect<ExtArgs> | null
    /**
     * Filter which QRSession to delete.
     */
    where: QRSessionWhereUniqueInput
  }

  /**
   * QRSession deleteMany
   */
  export type QRSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QRSessions to delete
     */
    where?: QRSessionWhereInput
  }

  /**
   * QRSession without action
   */
  export type QRSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRSession
     */
    select?: QRSessionSelect<ExtArgs> | null
  }


  /**
   * Model GeofenceSettings
   */

  export type AggregateGeofenceSettings = {
    _count: GeofenceSettingsCountAggregateOutputType | null
    _avg: GeofenceSettingsAvgAggregateOutputType | null
    _sum: GeofenceSettingsSumAggregateOutputType | null
    _min: GeofenceSettingsMinAggregateOutputType | null
    _max: GeofenceSettingsMaxAggregateOutputType | null
  }

  export type GeofenceSettingsAvgAggregateOutputType = {
    id: number | null
    defaultRadius: number | null
    accuracyThreshold: number | null
  }

  export type GeofenceSettingsSumAggregateOutputType = {
    id: number | null
    defaultRadius: number | null
    accuracyThreshold: number | null
  }

  export type GeofenceSettingsMinAggregateOutputType = {
    id: number | null
    defaultRadius: number | null
    enabled: boolean | null
    allowOverride: boolean | null
    accuracyThreshold: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GeofenceSettingsMaxAggregateOutputType = {
    id: number | null
    defaultRadius: number | null
    enabled: boolean | null
    allowOverride: boolean | null
    accuracyThreshold: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GeofenceSettingsCountAggregateOutputType = {
    id: number
    defaultRadius: number
    enabled: number
    allowOverride: number
    accuracyThreshold: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GeofenceSettingsAvgAggregateInputType = {
    id?: true
    defaultRadius?: true
    accuracyThreshold?: true
  }

  export type GeofenceSettingsSumAggregateInputType = {
    id?: true
    defaultRadius?: true
    accuracyThreshold?: true
  }

  export type GeofenceSettingsMinAggregateInputType = {
    id?: true
    defaultRadius?: true
    enabled?: true
    allowOverride?: true
    accuracyThreshold?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GeofenceSettingsMaxAggregateInputType = {
    id?: true
    defaultRadius?: true
    enabled?: true
    allowOverride?: true
    accuracyThreshold?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GeofenceSettingsCountAggregateInputType = {
    id?: true
    defaultRadius?: true
    enabled?: true
    allowOverride?: true
    accuracyThreshold?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GeofenceSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GeofenceSettings to aggregate.
     */
    where?: GeofenceSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeofenceSettings to fetch.
     */
    orderBy?: GeofenceSettingsOrderByWithRelationInput | GeofenceSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GeofenceSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeofenceSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeofenceSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GeofenceSettings
    **/
    _count?: true | GeofenceSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GeofenceSettingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GeofenceSettingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GeofenceSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GeofenceSettingsMaxAggregateInputType
  }

  export type GetGeofenceSettingsAggregateType<T extends GeofenceSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateGeofenceSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGeofenceSettings[P]>
      : GetScalarType<T[P], AggregateGeofenceSettings[P]>
  }




  export type GeofenceSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GeofenceSettingsWhereInput
    orderBy?: GeofenceSettingsOrderByWithAggregationInput | GeofenceSettingsOrderByWithAggregationInput[]
    by: GeofenceSettingsScalarFieldEnum[] | GeofenceSettingsScalarFieldEnum
    having?: GeofenceSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GeofenceSettingsCountAggregateInputType | true
    _avg?: GeofenceSettingsAvgAggregateInputType
    _sum?: GeofenceSettingsSumAggregateInputType
    _min?: GeofenceSettingsMinAggregateInputType
    _max?: GeofenceSettingsMaxAggregateInputType
  }

  export type GeofenceSettingsGroupByOutputType = {
    id: number
    defaultRadius: number
    enabled: boolean
    allowOverride: boolean
    accuracyThreshold: number
    createdAt: Date
    updatedAt: Date
    _count: GeofenceSettingsCountAggregateOutputType | null
    _avg: GeofenceSettingsAvgAggregateOutputType | null
    _sum: GeofenceSettingsSumAggregateOutputType | null
    _min: GeofenceSettingsMinAggregateOutputType | null
    _max: GeofenceSettingsMaxAggregateOutputType | null
  }

  type GetGeofenceSettingsGroupByPayload<T extends GeofenceSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GeofenceSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GeofenceSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GeofenceSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], GeofenceSettingsGroupByOutputType[P]>
        }
      >
    >


  export type GeofenceSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    defaultRadius?: boolean
    enabled?: boolean
    allowOverride?: boolean
    accuracyThreshold?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["geofenceSettings"]>

  export type GeofenceSettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    defaultRadius?: boolean
    enabled?: boolean
    allowOverride?: boolean
    accuracyThreshold?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["geofenceSettings"]>

  export type GeofenceSettingsSelectScalar = {
    id?: boolean
    defaultRadius?: boolean
    enabled?: boolean
    allowOverride?: boolean
    accuracyThreshold?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $GeofenceSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GeofenceSettings"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      defaultRadius: number
      enabled: boolean
      allowOverride: boolean
      accuracyThreshold: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["geofenceSettings"]>
    composites: {}
  }

  type GeofenceSettingsGetPayload<S extends boolean | null | undefined | GeofenceSettingsDefaultArgs> = $Result.GetResult<Prisma.$GeofenceSettingsPayload, S>

  type GeofenceSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GeofenceSettingsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GeofenceSettingsCountAggregateInputType | true
    }

  export interface GeofenceSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GeofenceSettings'], meta: { name: 'GeofenceSettings' } }
    /**
     * Find zero or one GeofenceSettings that matches the filter.
     * @param {GeofenceSettingsFindUniqueArgs} args - Arguments to find a GeofenceSettings
     * @example
     * // Get one GeofenceSettings
     * const geofenceSettings = await prisma.geofenceSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GeofenceSettingsFindUniqueArgs>(args: SelectSubset<T, GeofenceSettingsFindUniqueArgs<ExtArgs>>): Prisma__GeofenceSettingsClient<$Result.GetResult<Prisma.$GeofenceSettingsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one GeofenceSettings that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GeofenceSettingsFindUniqueOrThrowArgs} args - Arguments to find a GeofenceSettings
     * @example
     * // Get one GeofenceSettings
     * const geofenceSettings = await prisma.geofenceSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GeofenceSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, GeofenceSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GeofenceSettingsClient<$Result.GetResult<Prisma.$GeofenceSettingsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first GeofenceSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeofenceSettingsFindFirstArgs} args - Arguments to find a GeofenceSettings
     * @example
     * // Get one GeofenceSettings
     * const geofenceSettings = await prisma.geofenceSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GeofenceSettingsFindFirstArgs>(args?: SelectSubset<T, GeofenceSettingsFindFirstArgs<ExtArgs>>): Prisma__GeofenceSettingsClient<$Result.GetResult<Prisma.$GeofenceSettingsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first GeofenceSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeofenceSettingsFindFirstOrThrowArgs} args - Arguments to find a GeofenceSettings
     * @example
     * // Get one GeofenceSettings
     * const geofenceSettings = await prisma.geofenceSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GeofenceSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, GeofenceSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__GeofenceSettingsClient<$Result.GetResult<Prisma.$GeofenceSettingsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more GeofenceSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeofenceSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GeofenceSettings
     * const geofenceSettings = await prisma.geofenceSettings.findMany()
     * 
     * // Get first 10 GeofenceSettings
     * const geofenceSettings = await prisma.geofenceSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const geofenceSettingsWithIdOnly = await prisma.geofenceSettings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GeofenceSettingsFindManyArgs>(args?: SelectSubset<T, GeofenceSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GeofenceSettingsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a GeofenceSettings.
     * @param {GeofenceSettingsCreateArgs} args - Arguments to create a GeofenceSettings.
     * @example
     * // Create one GeofenceSettings
     * const GeofenceSettings = await prisma.geofenceSettings.create({
     *   data: {
     *     // ... data to create a GeofenceSettings
     *   }
     * })
     * 
     */
    create<T extends GeofenceSettingsCreateArgs>(args: SelectSubset<T, GeofenceSettingsCreateArgs<ExtArgs>>): Prisma__GeofenceSettingsClient<$Result.GetResult<Prisma.$GeofenceSettingsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many GeofenceSettings.
     * @param {GeofenceSettingsCreateManyArgs} args - Arguments to create many GeofenceSettings.
     * @example
     * // Create many GeofenceSettings
     * const geofenceSettings = await prisma.geofenceSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GeofenceSettingsCreateManyArgs>(args?: SelectSubset<T, GeofenceSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GeofenceSettings and returns the data saved in the database.
     * @param {GeofenceSettingsCreateManyAndReturnArgs} args - Arguments to create many GeofenceSettings.
     * @example
     * // Create many GeofenceSettings
     * const geofenceSettings = await prisma.geofenceSettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GeofenceSettings and only return the `id`
     * const geofenceSettingsWithIdOnly = await prisma.geofenceSettings.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GeofenceSettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, GeofenceSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GeofenceSettingsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a GeofenceSettings.
     * @param {GeofenceSettingsDeleteArgs} args - Arguments to delete one GeofenceSettings.
     * @example
     * // Delete one GeofenceSettings
     * const GeofenceSettings = await prisma.geofenceSettings.delete({
     *   where: {
     *     // ... filter to delete one GeofenceSettings
     *   }
     * })
     * 
     */
    delete<T extends GeofenceSettingsDeleteArgs>(args: SelectSubset<T, GeofenceSettingsDeleteArgs<ExtArgs>>): Prisma__GeofenceSettingsClient<$Result.GetResult<Prisma.$GeofenceSettingsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one GeofenceSettings.
     * @param {GeofenceSettingsUpdateArgs} args - Arguments to update one GeofenceSettings.
     * @example
     * // Update one GeofenceSettings
     * const geofenceSettings = await prisma.geofenceSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GeofenceSettingsUpdateArgs>(args: SelectSubset<T, GeofenceSettingsUpdateArgs<ExtArgs>>): Prisma__GeofenceSettingsClient<$Result.GetResult<Prisma.$GeofenceSettingsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more GeofenceSettings.
     * @param {GeofenceSettingsDeleteManyArgs} args - Arguments to filter GeofenceSettings to delete.
     * @example
     * // Delete a few GeofenceSettings
     * const { count } = await prisma.geofenceSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GeofenceSettingsDeleteManyArgs>(args?: SelectSubset<T, GeofenceSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GeofenceSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeofenceSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GeofenceSettings
     * const geofenceSettings = await prisma.geofenceSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GeofenceSettingsUpdateManyArgs>(args: SelectSubset<T, GeofenceSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GeofenceSettings.
     * @param {GeofenceSettingsUpsertArgs} args - Arguments to update or create a GeofenceSettings.
     * @example
     * // Update or create a GeofenceSettings
     * const geofenceSettings = await prisma.geofenceSettings.upsert({
     *   create: {
     *     // ... data to create a GeofenceSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GeofenceSettings we want to update
     *   }
     * })
     */
    upsert<T extends GeofenceSettingsUpsertArgs>(args: SelectSubset<T, GeofenceSettingsUpsertArgs<ExtArgs>>): Prisma__GeofenceSettingsClient<$Result.GetResult<Prisma.$GeofenceSettingsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of GeofenceSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeofenceSettingsCountArgs} args - Arguments to filter GeofenceSettings to count.
     * @example
     * // Count the number of GeofenceSettings
     * const count = await prisma.geofenceSettings.count({
     *   where: {
     *     // ... the filter for the GeofenceSettings we want to count
     *   }
     * })
    **/
    count<T extends GeofenceSettingsCountArgs>(
      args?: Subset<T, GeofenceSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GeofenceSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GeofenceSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeofenceSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GeofenceSettingsAggregateArgs>(args: Subset<T, GeofenceSettingsAggregateArgs>): Prisma.PrismaPromise<GetGeofenceSettingsAggregateType<T>>

    /**
     * Group by GeofenceSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GeofenceSettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GeofenceSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GeofenceSettingsGroupByArgs['orderBy'] }
        : { orderBy?: GeofenceSettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GeofenceSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGeofenceSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GeofenceSettings model
   */
  readonly fields: GeofenceSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GeofenceSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GeofenceSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GeofenceSettings model
   */ 
  interface GeofenceSettingsFieldRefs {
    readonly id: FieldRef<"GeofenceSettings", 'Int'>
    readonly defaultRadius: FieldRef<"GeofenceSettings", 'Int'>
    readonly enabled: FieldRef<"GeofenceSettings", 'Boolean'>
    readonly allowOverride: FieldRef<"GeofenceSettings", 'Boolean'>
    readonly accuracyThreshold: FieldRef<"GeofenceSettings", 'Float'>
    readonly createdAt: FieldRef<"GeofenceSettings", 'DateTime'>
    readonly updatedAt: FieldRef<"GeofenceSettings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GeofenceSettings findUnique
   */
  export type GeofenceSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeofenceSettings
     */
    select?: GeofenceSettingsSelect<ExtArgs> | null
    /**
     * Filter, which GeofenceSettings to fetch.
     */
    where: GeofenceSettingsWhereUniqueInput
  }

  /**
   * GeofenceSettings findUniqueOrThrow
   */
  export type GeofenceSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeofenceSettings
     */
    select?: GeofenceSettingsSelect<ExtArgs> | null
    /**
     * Filter, which GeofenceSettings to fetch.
     */
    where: GeofenceSettingsWhereUniqueInput
  }

  /**
   * GeofenceSettings findFirst
   */
  export type GeofenceSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeofenceSettings
     */
    select?: GeofenceSettingsSelect<ExtArgs> | null
    /**
     * Filter, which GeofenceSettings to fetch.
     */
    where?: GeofenceSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeofenceSettings to fetch.
     */
    orderBy?: GeofenceSettingsOrderByWithRelationInput | GeofenceSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GeofenceSettings.
     */
    cursor?: GeofenceSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeofenceSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeofenceSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GeofenceSettings.
     */
    distinct?: GeofenceSettingsScalarFieldEnum | GeofenceSettingsScalarFieldEnum[]
  }

  /**
   * GeofenceSettings findFirstOrThrow
   */
  export type GeofenceSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeofenceSettings
     */
    select?: GeofenceSettingsSelect<ExtArgs> | null
    /**
     * Filter, which GeofenceSettings to fetch.
     */
    where?: GeofenceSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeofenceSettings to fetch.
     */
    orderBy?: GeofenceSettingsOrderByWithRelationInput | GeofenceSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GeofenceSettings.
     */
    cursor?: GeofenceSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeofenceSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeofenceSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GeofenceSettings.
     */
    distinct?: GeofenceSettingsScalarFieldEnum | GeofenceSettingsScalarFieldEnum[]
  }

  /**
   * GeofenceSettings findMany
   */
  export type GeofenceSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeofenceSettings
     */
    select?: GeofenceSettingsSelect<ExtArgs> | null
    /**
     * Filter, which GeofenceSettings to fetch.
     */
    where?: GeofenceSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GeofenceSettings to fetch.
     */
    orderBy?: GeofenceSettingsOrderByWithRelationInput | GeofenceSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GeofenceSettings.
     */
    cursor?: GeofenceSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GeofenceSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GeofenceSettings.
     */
    skip?: number
    distinct?: GeofenceSettingsScalarFieldEnum | GeofenceSettingsScalarFieldEnum[]
  }

  /**
   * GeofenceSettings create
   */
  export type GeofenceSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeofenceSettings
     */
    select?: GeofenceSettingsSelect<ExtArgs> | null
    /**
     * The data needed to create a GeofenceSettings.
     */
    data: XOR<GeofenceSettingsCreateInput, GeofenceSettingsUncheckedCreateInput>
  }

  /**
   * GeofenceSettings createMany
   */
  export type GeofenceSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GeofenceSettings.
     */
    data: GeofenceSettingsCreateManyInput | GeofenceSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GeofenceSettings createManyAndReturn
   */
  export type GeofenceSettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeofenceSettings
     */
    select?: GeofenceSettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many GeofenceSettings.
     */
    data: GeofenceSettingsCreateManyInput | GeofenceSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GeofenceSettings update
   */
  export type GeofenceSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeofenceSettings
     */
    select?: GeofenceSettingsSelect<ExtArgs> | null
    /**
     * The data needed to update a GeofenceSettings.
     */
    data: XOR<GeofenceSettingsUpdateInput, GeofenceSettingsUncheckedUpdateInput>
    /**
     * Choose, which GeofenceSettings to update.
     */
    where: GeofenceSettingsWhereUniqueInput
  }

  /**
   * GeofenceSettings updateMany
   */
  export type GeofenceSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GeofenceSettings.
     */
    data: XOR<GeofenceSettingsUpdateManyMutationInput, GeofenceSettingsUncheckedUpdateManyInput>
    /**
     * Filter which GeofenceSettings to update
     */
    where?: GeofenceSettingsWhereInput
  }

  /**
   * GeofenceSettings upsert
   */
  export type GeofenceSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeofenceSettings
     */
    select?: GeofenceSettingsSelect<ExtArgs> | null
    /**
     * The filter to search for the GeofenceSettings to update in case it exists.
     */
    where: GeofenceSettingsWhereUniqueInput
    /**
     * In case the GeofenceSettings found by the `where` argument doesn't exist, create a new GeofenceSettings with this data.
     */
    create: XOR<GeofenceSettingsCreateInput, GeofenceSettingsUncheckedCreateInput>
    /**
     * In case the GeofenceSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GeofenceSettingsUpdateInput, GeofenceSettingsUncheckedUpdateInput>
  }

  /**
   * GeofenceSettings delete
   */
  export type GeofenceSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeofenceSettings
     */
    select?: GeofenceSettingsSelect<ExtArgs> | null
    /**
     * Filter which GeofenceSettings to delete.
     */
    where: GeofenceSettingsWhereUniqueInput
  }

  /**
   * GeofenceSettings deleteMany
   */
  export type GeofenceSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GeofenceSettings to delete
     */
    where?: GeofenceSettingsWhereInput
  }

  /**
   * GeofenceSettings without action
   */
  export type GeofenceSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GeofenceSettings
     */
    select?: GeofenceSettingsSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    employeeId: 'employeeId',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const StudentScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    name: 'name',
    email: 'email',
    password: 'password',
    phone: 'phone',
    department: 'department',
    class: 'class',
    section: 'section',
    year: 'year',
    enrollmentDate: 'enrollmentDate',
    status: 'status',
    gpa: 'gpa',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StudentScalarFieldEnum = (typeof StudentScalarFieldEnum)[keyof typeof StudentScalarFieldEnum]


  export const StudentAttendanceScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    classId: 'classId',
    date: 'date',
    status: 'status',
    timestamp: 'timestamp',
    studentLatitude: 'studentLatitude',
    studentLongitude: 'studentLongitude',
    distanceFromClass: 'distanceFromClass',
    locationVerified: 'locationVerified',
    createdAt: 'createdAt'
  };

  export type StudentAttendanceScalarFieldEnum = (typeof StudentAttendanceScalarFieldEnum)[keyof typeof StudentAttendanceScalarFieldEnum]


  export const AttendanceScalarFieldEnum: {
    id: 'id',
    employeeId: 'employeeId',
    type: 'type',
    timestamp: 'timestamp',
    userId: 'userId',
    createdAt: 'createdAt'
  };

  export type AttendanceScalarFieldEnum = (typeof AttendanceScalarFieldEnum)[keyof typeof AttendanceScalarFieldEnum]


  export const ClassScalarFieldEnum: {
    id: 'id',
    name: 'name',
    code: 'code',
    faculty: 'faculty',
    maxStudents: 'maxStudents',
    schedule: 'schedule',
    room: 'room',
    latitude: 'latitude',
    longitude: 'longitude',
    geofenceRadius: 'geofenceRadius',
    geofenceEnabled: 'geofenceEnabled',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClassScalarFieldEnum = (typeof ClassScalarFieldEnum)[keyof typeof ClassScalarFieldEnum]


  export const QRSessionScalarFieldEnum: {
    id: 'id',
    classId: 'classId',
    className: 'className',
    latitude: 'latitude',
    longitude: 'longitude',
    radius: 'radius',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    expiresAt: 'expiresAt',
    isActive: 'isActive'
  };

  export type QRSessionScalarFieldEnum = (typeof QRSessionScalarFieldEnum)[keyof typeof QRSessionScalarFieldEnum]


  export const GeofenceSettingsScalarFieldEnum: {
    id: 'id',
    defaultRadius: 'defaultRadius',
    enabled: 'enabled',
    allowOverride: 'allowOverride',
    accuracyThreshold: 'accuracyThreshold',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GeofenceSettingsScalarFieldEnum = (typeof GeofenceSettingsScalarFieldEnum)[keyof typeof GeofenceSettingsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    employeeId?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    attendance?: AttendanceListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    employeeId?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    attendance?: AttendanceOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    employeeId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    attendance?: AttendanceListRelationFilter
  }, "id" | "email" | "employeeId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    employeeId?: SortOrderInput | SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    employeeId?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type StudentWhereInput = {
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    id?: IntFilter<"Student"> | number
    studentId?: StringFilter<"Student"> | string
    name?: StringFilter<"Student"> | string
    email?: StringFilter<"Student"> | string
    password?: StringFilter<"Student"> | string
    phone?: StringNullableFilter<"Student"> | string | null
    department?: StringFilter<"Student"> | string
    class?: StringFilter<"Student"> | string
    section?: StringFilter<"Student"> | string
    year?: StringFilter<"Student"> | string
    enrollmentDate?: DateTimeFilter<"Student"> | Date | string
    status?: StringFilter<"Student"> | string
    gpa?: FloatNullableFilter<"Student"> | number | null
    createdAt?: DateTimeFilter<"Student"> | Date | string
    updatedAt?: DateTimeFilter<"Student"> | Date | string
    attendance?: StudentAttendanceListRelationFilter
  }

  export type StudentOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrderInput | SortOrder
    department?: SortOrder
    class?: SortOrder
    section?: SortOrder
    year?: SortOrder
    enrollmentDate?: SortOrder
    status?: SortOrder
    gpa?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    attendance?: StudentAttendanceOrderByRelationAggregateInput
  }

  export type StudentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    studentId?: string
    email?: string
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    name?: StringFilter<"Student"> | string
    password?: StringFilter<"Student"> | string
    phone?: StringNullableFilter<"Student"> | string | null
    department?: StringFilter<"Student"> | string
    class?: StringFilter<"Student"> | string
    section?: StringFilter<"Student"> | string
    year?: StringFilter<"Student"> | string
    enrollmentDate?: DateTimeFilter<"Student"> | Date | string
    status?: StringFilter<"Student"> | string
    gpa?: FloatNullableFilter<"Student"> | number | null
    createdAt?: DateTimeFilter<"Student"> | Date | string
    updatedAt?: DateTimeFilter<"Student"> | Date | string
    attendance?: StudentAttendanceListRelationFilter
  }, "id" | "studentId" | "email">

  export type StudentOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrderInput | SortOrder
    department?: SortOrder
    class?: SortOrder
    section?: SortOrder
    year?: SortOrder
    enrollmentDate?: SortOrder
    status?: SortOrder
    gpa?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StudentCountOrderByAggregateInput
    _avg?: StudentAvgOrderByAggregateInput
    _max?: StudentMaxOrderByAggregateInput
    _min?: StudentMinOrderByAggregateInput
    _sum?: StudentSumOrderByAggregateInput
  }

  export type StudentScalarWhereWithAggregatesInput = {
    AND?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    OR?: StudentScalarWhereWithAggregatesInput[]
    NOT?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Student"> | number
    studentId?: StringWithAggregatesFilter<"Student"> | string
    name?: StringWithAggregatesFilter<"Student"> | string
    email?: StringWithAggregatesFilter<"Student"> | string
    password?: StringWithAggregatesFilter<"Student"> | string
    phone?: StringNullableWithAggregatesFilter<"Student"> | string | null
    department?: StringWithAggregatesFilter<"Student"> | string
    class?: StringWithAggregatesFilter<"Student"> | string
    section?: StringWithAggregatesFilter<"Student"> | string
    year?: StringWithAggregatesFilter<"Student"> | string
    enrollmentDate?: DateTimeWithAggregatesFilter<"Student"> | Date | string
    status?: StringWithAggregatesFilter<"Student"> | string
    gpa?: FloatNullableWithAggregatesFilter<"Student"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Student"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Student"> | Date | string
  }

  export type StudentAttendanceWhereInput = {
    AND?: StudentAttendanceWhereInput | StudentAttendanceWhereInput[]
    OR?: StudentAttendanceWhereInput[]
    NOT?: StudentAttendanceWhereInput | StudentAttendanceWhereInput[]
    id?: IntFilter<"StudentAttendance"> | number
    studentId?: IntFilter<"StudentAttendance"> | number
    classId?: StringFilter<"StudentAttendance"> | string
    date?: DateTimeFilter<"StudentAttendance"> | Date | string
    status?: StringFilter<"StudentAttendance"> | string
    timestamp?: StringNullableFilter<"StudentAttendance"> | string | null
    studentLatitude?: FloatNullableFilter<"StudentAttendance"> | number | null
    studentLongitude?: FloatNullableFilter<"StudentAttendance"> | number | null
    distanceFromClass?: FloatNullableFilter<"StudentAttendance"> | number | null
    locationVerified?: BoolFilter<"StudentAttendance"> | boolean
    createdAt?: DateTimeFilter<"StudentAttendance"> | Date | string
    student?: XOR<StudentRelationFilter, StudentWhereInput>
  }

  export type StudentAttendanceOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    classId?: SortOrder
    date?: SortOrder
    status?: SortOrder
    timestamp?: SortOrderInput | SortOrder
    studentLatitude?: SortOrderInput | SortOrder
    studentLongitude?: SortOrderInput | SortOrder
    distanceFromClass?: SortOrderInput | SortOrder
    locationVerified?: SortOrder
    createdAt?: SortOrder
    student?: StudentOrderByWithRelationInput
  }

  export type StudentAttendanceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: StudentAttendanceWhereInput | StudentAttendanceWhereInput[]
    OR?: StudentAttendanceWhereInput[]
    NOT?: StudentAttendanceWhereInput | StudentAttendanceWhereInput[]
    studentId?: IntFilter<"StudentAttendance"> | number
    classId?: StringFilter<"StudentAttendance"> | string
    date?: DateTimeFilter<"StudentAttendance"> | Date | string
    status?: StringFilter<"StudentAttendance"> | string
    timestamp?: StringNullableFilter<"StudentAttendance"> | string | null
    studentLatitude?: FloatNullableFilter<"StudentAttendance"> | number | null
    studentLongitude?: FloatNullableFilter<"StudentAttendance"> | number | null
    distanceFromClass?: FloatNullableFilter<"StudentAttendance"> | number | null
    locationVerified?: BoolFilter<"StudentAttendance"> | boolean
    createdAt?: DateTimeFilter<"StudentAttendance"> | Date | string
    student?: XOR<StudentRelationFilter, StudentWhereInput>
  }, "id">

  export type StudentAttendanceOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    classId?: SortOrder
    date?: SortOrder
    status?: SortOrder
    timestamp?: SortOrderInput | SortOrder
    studentLatitude?: SortOrderInput | SortOrder
    studentLongitude?: SortOrderInput | SortOrder
    distanceFromClass?: SortOrderInput | SortOrder
    locationVerified?: SortOrder
    createdAt?: SortOrder
    _count?: StudentAttendanceCountOrderByAggregateInput
    _avg?: StudentAttendanceAvgOrderByAggregateInput
    _max?: StudentAttendanceMaxOrderByAggregateInput
    _min?: StudentAttendanceMinOrderByAggregateInput
    _sum?: StudentAttendanceSumOrderByAggregateInput
  }

  export type StudentAttendanceScalarWhereWithAggregatesInput = {
    AND?: StudentAttendanceScalarWhereWithAggregatesInput | StudentAttendanceScalarWhereWithAggregatesInput[]
    OR?: StudentAttendanceScalarWhereWithAggregatesInput[]
    NOT?: StudentAttendanceScalarWhereWithAggregatesInput | StudentAttendanceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"StudentAttendance"> | number
    studentId?: IntWithAggregatesFilter<"StudentAttendance"> | number
    classId?: StringWithAggregatesFilter<"StudentAttendance"> | string
    date?: DateTimeWithAggregatesFilter<"StudentAttendance"> | Date | string
    status?: StringWithAggregatesFilter<"StudentAttendance"> | string
    timestamp?: StringNullableWithAggregatesFilter<"StudentAttendance"> | string | null
    studentLatitude?: FloatNullableWithAggregatesFilter<"StudentAttendance"> | number | null
    studentLongitude?: FloatNullableWithAggregatesFilter<"StudentAttendance"> | number | null
    distanceFromClass?: FloatNullableWithAggregatesFilter<"StudentAttendance"> | number | null
    locationVerified?: BoolWithAggregatesFilter<"StudentAttendance"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"StudentAttendance"> | Date | string
  }

  export type AttendanceWhereInput = {
    AND?: AttendanceWhereInput | AttendanceWhereInput[]
    OR?: AttendanceWhereInput[]
    NOT?: AttendanceWhereInput | AttendanceWhereInput[]
    id?: IntFilter<"Attendance"> | number
    employeeId?: StringFilter<"Attendance"> | string
    type?: StringFilter<"Attendance"> | string
    timestamp?: DateTimeFilter<"Attendance"> | Date | string
    userId?: IntFilter<"Attendance"> | number
    createdAt?: DateTimeFilter<"Attendance"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type AttendanceOrderByWithRelationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    type?: SortOrder
    timestamp?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AttendanceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AttendanceWhereInput | AttendanceWhereInput[]
    OR?: AttendanceWhereInput[]
    NOT?: AttendanceWhereInput | AttendanceWhereInput[]
    employeeId?: StringFilter<"Attendance"> | string
    type?: StringFilter<"Attendance"> | string
    timestamp?: DateTimeFilter<"Attendance"> | Date | string
    userId?: IntFilter<"Attendance"> | number
    createdAt?: DateTimeFilter<"Attendance"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type AttendanceOrderByWithAggregationInput = {
    id?: SortOrder
    employeeId?: SortOrder
    type?: SortOrder
    timestamp?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    _count?: AttendanceCountOrderByAggregateInput
    _avg?: AttendanceAvgOrderByAggregateInput
    _max?: AttendanceMaxOrderByAggregateInput
    _min?: AttendanceMinOrderByAggregateInput
    _sum?: AttendanceSumOrderByAggregateInput
  }

  export type AttendanceScalarWhereWithAggregatesInput = {
    AND?: AttendanceScalarWhereWithAggregatesInput | AttendanceScalarWhereWithAggregatesInput[]
    OR?: AttendanceScalarWhereWithAggregatesInput[]
    NOT?: AttendanceScalarWhereWithAggregatesInput | AttendanceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Attendance"> | number
    employeeId?: StringWithAggregatesFilter<"Attendance"> | string
    type?: StringWithAggregatesFilter<"Attendance"> | string
    timestamp?: DateTimeWithAggregatesFilter<"Attendance"> | Date | string
    userId?: IntWithAggregatesFilter<"Attendance"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Attendance"> | Date | string
  }

  export type ClassWhereInput = {
    AND?: ClassWhereInput | ClassWhereInput[]
    OR?: ClassWhereInput[]
    NOT?: ClassWhereInput | ClassWhereInput[]
    id?: IntFilter<"Class"> | number
    name?: StringFilter<"Class"> | string
    code?: StringFilter<"Class"> | string
    faculty?: StringFilter<"Class"> | string
    maxStudents?: IntNullableFilter<"Class"> | number | null
    schedule?: StringNullableFilter<"Class"> | string | null
    room?: StringNullableFilter<"Class"> | string | null
    latitude?: FloatNullableFilter<"Class"> | number | null
    longitude?: FloatNullableFilter<"Class"> | number | null
    geofenceRadius?: IntFilter<"Class"> | number
    geofenceEnabled?: BoolFilter<"Class"> | boolean
    createdBy?: IntNullableFilter<"Class"> | number | null
    createdAt?: DateTimeFilter<"Class"> | Date | string
    updatedAt?: DateTimeFilter<"Class"> | Date | string
  }

  export type ClassOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    faculty?: SortOrder
    maxStudents?: SortOrderInput | SortOrder
    schedule?: SortOrderInput | SortOrder
    room?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    geofenceRadius?: SortOrder
    geofenceEnabled?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClassWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    code?: string
    AND?: ClassWhereInput | ClassWhereInput[]
    OR?: ClassWhereInput[]
    NOT?: ClassWhereInput | ClassWhereInput[]
    name?: StringFilter<"Class"> | string
    faculty?: StringFilter<"Class"> | string
    maxStudents?: IntNullableFilter<"Class"> | number | null
    schedule?: StringNullableFilter<"Class"> | string | null
    room?: StringNullableFilter<"Class"> | string | null
    latitude?: FloatNullableFilter<"Class"> | number | null
    longitude?: FloatNullableFilter<"Class"> | number | null
    geofenceRadius?: IntFilter<"Class"> | number
    geofenceEnabled?: BoolFilter<"Class"> | boolean
    createdBy?: IntNullableFilter<"Class"> | number | null
    createdAt?: DateTimeFilter<"Class"> | Date | string
    updatedAt?: DateTimeFilter<"Class"> | Date | string
  }, "id" | "code">

  export type ClassOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    faculty?: SortOrder
    maxStudents?: SortOrderInput | SortOrder
    schedule?: SortOrderInput | SortOrder
    room?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    geofenceRadius?: SortOrder
    geofenceEnabled?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClassCountOrderByAggregateInput
    _avg?: ClassAvgOrderByAggregateInput
    _max?: ClassMaxOrderByAggregateInput
    _min?: ClassMinOrderByAggregateInput
    _sum?: ClassSumOrderByAggregateInput
  }

  export type ClassScalarWhereWithAggregatesInput = {
    AND?: ClassScalarWhereWithAggregatesInput | ClassScalarWhereWithAggregatesInput[]
    OR?: ClassScalarWhereWithAggregatesInput[]
    NOT?: ClassScalarWhereWithAggregatesInput | ClassScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Class"> | number
    name?: StringWithAggregatesFilter<"Class"> | string
    code?: StringWithAggregatesFilter<"Class"> | string
    faculty?: StringWithAggregatesFilter<"Class"> | string
    maxStudents?: IntNullableWithAggregatesFilter<"Class"> | number | null
    schedule?: StringNullableWithAggregatesFilter<"Class"> | string | null
    room?: StringNullableWithAggregatesFilter<"Class"> | string | null
    latitude?: FloatNullableWithAggregatesFilter<"Class"> | number | null
    longitude?: FloatNullableWithAggregatesFilter<"Class"> | number | null
    geofenceRadius?: IntWithAggregatesFilter<"Class"> | number
    geofenceEnabled?: BoolWithAggregatesFilter<"Class"> | boolean
    createdBy?: IntNullableWithAggregatesFilter<"Class"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Class"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Class"> | Date | string
  }

  export type QRSessionWhereInput = {
    AND?: QRSessionWhereInput | QRSessionWhereInput[]
    OR?: QRSessionWhereInput[]
    NOT?: QRSessionWhereInput | QRSessionWhereInput[]
    id?: StringFilter<"QRSession"> | string
    classId?: StringFilter<"QRSession"> | string
    className?: StringFilter<"QRSession"> | string
    latitude?: FloatNullableFilter<"QRSession"> | number | null
    longitude?: FloatNullableFilter<"QRSession"> | number | null
    radius?: IntFilter<"QRSession"> | number
    createdBy?: StringNullableFilter<"QRSession"> | string | null
    createdAt?: DateTimeFilter<"QRSession"> | Date | string
    expiresAt?: DateTimeFilter<"QRSession"> | Date | string
    isActive?: BoolFilter<"QRSession"> | boolean
  }

  export type QRSessionOrderByWithRelationInput = {
    id?: SortOrder
    classId?: SortOrder
    className?: SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    radius?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    isActive?: SortOrder
  }

  export type QRSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: QRSessionWhereInput | QRSessionWhereInput[]
    OR?: QRSessionWhereInput[]
    NOT?: QRSessionWhereInput | QRSessionWhereInput[]
    classId?: StringFilter<"QRSession"> | string
    className?: StringFilter<"QRSession"> | string
    latitude?: FloatNullableFilter<"QRSession"> | number | null
    longitude?: FloatNullableFilter<"QRSession"> | number | null
    radius?: IntFilter<"QRSession"> | number
    createdBy?: StringNullableFilter<"QRSession"> | string | null
    createdAt?: DateTimeFilter<"QRSession"> | Date | string
    expiresAt?: DateTimeFilter<"QRSession"> | Date | string
    isActive?: BoolFilter<"QRSession"> | boolean
  }, "id">

  export type QRSessionOrderByWithAggregationInput = {
    id?: SortOrder
    classId?: SortOrder
    className?: SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    radius?: SortOrder
    createdBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    isActive?: SortOrder
    _count?: QRSessionCountOrderByAggregateInput
    _avg?: QRSessionAvgOrderByAggregateInput
    _max?: QRSessionMaxOrderByAggregateInput
    _min?: QRSessionMinOrderByAggregateInput
    _sum?: QRSessionSumOrderByAggregateInput
  }

  export type QRSessionScalarWhereWithAggregatesInput = {
    AND?: QRSessionScalarWhereWithAggregatesInput | QRSessionScalarWhereWithAggregatesInput[]
    OR?: QRSessionScalarWhereWithAggregatesInput[]
    NOT?: QRSessionScalarWhereWithAggregatesInput | QRSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"QRSession"> | string
    classId?: StringWithAggregatesFilter<"QRSession"> | string
    className?: StringWithAggregatesFilter<"QRSession"> | string
    latitude?: FloatNullableWithAggregatesFilter<"QRSession"> | number | null
    longitude?: FloatNullableWithAggregatesFilter<"QRSession"> | number | null
    radius?: IntWithAggregatesFilter<"QRSession"> | number
    createdBy?: StringNullableWithAggregatesFilter<"QRSession"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"QRSession"> | Date | string
    expiresAt?: DateTimeWithAggregatesFilter<"QRSession"> | Date | string
    isActive?: BoolWithAggregatesFilter<"QRSession"> | boolean
  }

  export type GeofenceSettingsWhereInput = {
    AND?: GeofenceSettingsWhereInput | GeofenceSettingsWhereInput[]
    OR?: GeofenceSettingsWhereInput[]
    NOT?: GeofenceSettingsWhereInput | GeofenceSettingsWhereInput[]
    id?: IntFilter<"GeofenceSettings"> | number
    defaultRadius?: IntFilter<"GeofenceSettings"> | number
    enabled?: BoolFilter<"GeofenceSettings"> | boolean
    allowOverride?: BoolFilter<"GeofenceSettings"> | boolean
    accuracyThreshold?: FloatFilter<"GeofenceSettings"> | number
    createdAt?: DateTimeFilter<"GeofenceSettings"> | Date | string
    updatedAt?: DateTimeFilter<"GeofenceSettings"> | Date | string
  }

  export type GeofenceSettingsOrderByWithRelationInput = {
    id?: SortOrder
    defaultRadius?: SortOrder
    enabled?: SortOrder
    allowOverride?: SortOrder
    accuracyThreshold?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GeofenceSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: GeofenceSettingsWhereInput | GeofenceSettingsWhereInput[]
    OR?: GeofenceSettingsWhereInput[]
    NOT?: GeofenceSettingsWhereInput | GeofenceSettingsWhereInput[]
    defaultRadius?: IntFilter<"GeofenceSettings"> | number
    enabled?: BoolFilter<"GeofenceSettings"> | boolean
    allowOverride?: BoolFilter<"GeofenceSettings"> | boolean
    accuracyThreshold?: FloatFilter<"GeofenceSettings"> | number
    createdAt?: DateTimeFilter<"GeofenceSettings"> | Date | string
    updatedAt?: DateTimeFilter<"GeofenceSettings"> | Date | string
  }, "id">

  export type GeofenceSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    defaultRadius?: SortOrder
    enabled?: SortOrder
    allowOverride?: SortOrder
    accuracyThreshold?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GeofenceSettingsCountOrderByAggregateInput
    _avg?: GeofenceSettingsAvgOrderByAggregateInput
    _max?: GeofenceSettingsMaxOrderByAggregateInput
    _min?: GeofenceSettingsMinOrderByAggregateInput
    _sum?: GeofenceSettingsSumOrderByAggregateInput
  }

  export type GeofenceSettingsScalarWhereWithAggregatesInput = {
    AND?: GeofenceSettingsScalarWhereWithAggregatesInput | GeofenceSettingsScalarWhereWithAggregatesInput[]
    OR?: GeofenceSettingsScalarWhereWithAggregatesInput[]
    NOT?: GeofenceSettingsScalarWhereWithAggregatesInput | GeofenceSettingsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"GeofenceSettings"> | number
    defaultRadius?: IntWithAggregatesFilter<"GeofenceSettings"> | number
    enabled?: BoolWithAggregatesFilter<"GeofenceSettings"> | boolean
    allowOverride?: BoolWithAggregatesFilter<"GeofenceSettings"> | boolean
    accuracyThreshold?: FloatWithAggregatesFilter<"GeofenceSettings"> | number
    createdAt?: DateTimeWithAggregatesFilter<"GeofenceSettings"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"GeofenceSettings"> | Date | string
  }

  export type UserCreateInput = {
    email: string
    password: string
    name: string
    employeeId?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    attendance?: AttendanceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    password: string
    name: string
    employeeId?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    attendance?: AttendanceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendance?: AttendanceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendance?: AttendanceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    password: string
    name: string
    employeeId?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentCreateInput = {
    studentId: string
    name: string
    email: string
    password?: string
    phone?: string | null
    department: string
    class: string
    section: string
    year: string
    enrollmentDate?: Date | string
    status?: string
    gpa?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attendance?: StudentAttendanceCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateInput = {
    id?: number
    studentId: string
    name: string
    email: string
    password?: string
    phone?: string | null
    department: string
    class: string
    section: string
    year: string
    enrollmentDate?: Date | string
    status?: string
    gpa?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attendance?: StudentAttendanceUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentUpdateInput = {
    studentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: StringFieldUpdateOperationsInput | string
    class?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    enrollmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    gpa?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendance?: StudentAttendanceUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: StringFieldUpdateOperationsInput | string
    class?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    enrollmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    gpa?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendance?: StudentAttendanceUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateManyInput = {
    id?: number
    studentId: string
    name: string
    email: string
    password?: string
    phone?: string | null
    department: string
    class: string
    section: string
    year: string
    enrollmentDate?: Date | string
    status?: string
    gpa?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentUpdateManyMutationInput = {
    studentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: StringFieldUpdateOperationsInput | string
    class?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    enrollmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    gpa?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: StringFieldUpdateOperationsInput | string
    class?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    enrollmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    gpa?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentAttendanceCreateInput = {
    classId: string
    date?: Date | string
    status: string
    timestamp?: string | null
    studentLatitude?: number | null
    studentLongitude?: number | null
    distanceFromClass?: number | null
    locationVerified?: boolean
    createdAt?: Date | string
    student: StudentCreateNestedOneWithoutAttendanceInput
  }

  export type StudentAttendanceUncheckedCreateInput = {
    id?: number
    studentId: number
    classId: string
    date?: Date | string
    status: string
    timestamp?: string | null
    studentLatitude?: number | null
    studentLongitude?: number | null
    distanceFromClass?: number | null
    locationVerified?: boolean
    createdAt?: Date | string
  }

  export type StudentAttendanceUpdateInput = {
    classId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: NullableStringFieldUpdateOperationsInput | string | null
    studentLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    studentLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    distanceFromClass?: NullableFloatFieldUpdateOperationsInput | number | null
    locationVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutAttendanceNestedInput
  }

  export type StudentAttendanceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    classId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: NullableStringFieldUpdateOperationsInput | string | null
    studentLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    studentLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    distanceFromClass?: NullableFloatFieldUpdateOperationsInput | number | null
    locationVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentAttendanceCreateManyInput = {
    id?: number
    studentId: number
    classId: string
    date?: Date | string
    status: string
    timestamp?: string | null
    studentLatitude?: number | null
    studentLongitude?: number | null
    distanceFromClass?: number | null
    locationVerified?: boolean
    createdAt?: Date | string
  }

  export type StudentAttendanceUpdateManyMutationInput = {
    classId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: NullableStringFieldUpdateOperationsInput | string | null
    studentLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    studentLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    distanceFromClass?: NullableFloatFieldUpdateOperationsInput | number | null
    locationVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentAttendanceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    classId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: NullableStringFieldUpdateOperationsInput | string | null
    studentLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    studentLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    distanceFromClass?: NullableFloatFieldUpdateOperationsInput | number | null
    locationVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceCreateInput = {
    employeeId: string
    type: string
    timestamp?: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutAttendanceInput
  }

  export type AttendanceUncheckedCreateInput = {
    id?: number
    employeeId: string
    type: string
    timestamp?: Date | string
    userId: number
    createdAt?: Date | string
  }

  export type AttendanceUpdateInput = {
    employeeId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAttendanceNestedInput
  }

  export type AttendanceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    employeeId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceCreateManyInput = {
    id?: number
    employeeId: string
    type: string
    timestamp?: Date | string
    userId: number
    createdAt?: Date | string
  }

  export type AttendanceUpdateManyMutationInput = {
    employeeId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    employeeId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassCreateInput = {
    name: string
    code: string
    faculty: string
    maxStudents?: number | null
    schedule?: string | null
    room?: string | null
    latitude?: number | null
    longitude?: number | null
    geofenceRadius?: number
    geofenceEnabled?: boolean
    createdBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClassUncheckedCreateInput = {
    id?: number
    name: string
    code: string
    faculty: string
    maxStudents?: number | null
    schedule?: string | null
    room?: string | null
    latitude?: number | null
    longitude?: number | null
    geofenceRadius?: number
    geofenceEnabled?: boolean
    createdBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClassUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    faculty?: StringFieldUpdateOperationsInput | string
    maxStudents?: NullableIntFieldUpdateOperationsInput | number | null
    schedule?: NullableStringFieldUpdateOperationsInput | string | null
    room?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    geofenceRadius?: IntFieldUpdateOperationsInput | number
    geofenceEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    faculty?: StringFieldUpdateOperationsInput | string
    maxStudents?: NullableIntFieldUpdateOperationsInput | number | null
    schedule?: NullableStringFieldUpdateOperationsInput | string | null
    room?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    geofenceRadius?: IntFieldUpdateOperationsInput | number
    geofenceEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassCreateManyInput = {
    id?: number
    name: string
    code: string
    faculty: string
    maxStudents?: number | null
    schedule?: string | null
    room?: string | null
    latitude?: number | null
    longitude?: number | null
    geofenceRadius?: number
    geofenceEnabled?: boolean
    createdBy?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClassUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    faculty?: StringFieldUpdateOperationsInput | string
    maxStudents?: NullableIntFieldUpdateOperationsInput | number | null
    schedule?: NullableStringFieldUpdateOperationsInput | string | null
    room?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    geofenceRadius?: IntFieldUpdateOperationsInput | number
    geofenceEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    faculty?: StringFieldUpdateOperationsInput | string
    maxStudents?: NullableIntFieldUpdateOperationsInput | number | null
    schedule?: NullableStringFieldUpdateOperationsInput | string | null
    room?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    geofenceRadius?: IntFieldUpdateOperationsInput | number
    geofenceEnabled?: BoolFieldUpdateOperationsInput | boolean
    createdBy?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QRSessionCreateInput = {
    id: string
    classId: string
    className: string
    latitude?: number | null
    longitude?: number | null
    radius?: number
    createdBy?: string | null
    createdAt?: Date | string
    expiresAt: Date | string
    isActive?: boolean
  }

  export type QRSessionUncheckedCreateInput = {
    id: string
    classId: string
    className: string
    latitude?: number | null
    longitude?: number | null
    radius?: number
    createdBy?: string | null
    createdAt?: Date | string
    expiresAt: Date | string
    isActive?: boolean
  }

  export type QRSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    classId?: StringFieldUpdateOperationsInput | string
    className?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    radius?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type QRSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    classId?: StringFieldUpdateOperationsInput | string
    className?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    radius?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type QRSessionCreateManyInput = {
    id: string
    classId: string
    className: string
    latitude?: number | null
    longitude?: number | null
    radius?: number
    createdBy?: string | null
    createdAt?: Date | string
    expiresAt: Date | string
    isActive?: boolean
  }

  export type QRSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    classId?: StringFieldUpdateOperationsInput | string
    className?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    radius?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type QRSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    classId?: StringFieldUpdateOperationsInput | string
    className?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    radius?: IntFieldUpdateOperationsInput | number
    createdBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type GeofenceSettingsCreateInput = {
    defaultRadius?: number
    enabled?: boolean
    allowOverride?: boolean
    accuracyThreshold?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GeofenceSettingsUncheckedCreateInput = {
    id?: number
    defaultRadius?: number
    enabled?: boolean
    allowOverride?: boolean
    accuracyThreshold?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GeofenceSettingsUpdateInput = {
    defaultRadius?: IntFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    allowOverride?: BoolFieldUpdateOperationsInput | boolean
    accuracyThreshold?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeofenceSettingsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    defaultRadius?: IntFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    allowOverride?: BoolFieldUpdateOperationsInput | boolean
    accuracyThreshold?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeofenceSettingsCreateManyInput = {
    id?: number
    defaultRadius?: number
    enabled?: boolean
    allowOverride?: boolean
    accuracyThreshold?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GeofenceSettingsUpdateManyMutationInput = {
    defaultRadius?: IntFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    allowOverride?: BoolFieldUpdateOperationsInput | boolean
    accuracyThreshold?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GeofenceSettingsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    defaultRadius?: IntFieldUpdateOperationsInput | number
    enabled?: BoolFieldUpdateOperationsInput | boolean
    allowOverride?: BoolFieldUpdateOperationsInput | boolean
    accuracyThreshold?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AttendanceListRelationFilter = {
    every?: AttendanceWhereInput
    some?: AttendanceWhereInput
    none?: AttendanceWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AttendanceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    employeeId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    employeeId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    employeeId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type StudentAttendanceListRelationFilter = {
    every?: StudentAttendanceWhereInput
    some?: StudentAttendanceWhereInput
    none?: StudentAttendanceWhereInput
  }

  export type StudentAttendanceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    department?: SortOrder
    class?: SortOrder
    section?: SortOrder
    year?: SortOrder
    enrollmentDate?: SortOrder
    status?: SortOrder
    gpa?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentAvgOrderByAggregateInput = {
    id?: SortOrder
    gpa?: SortOrder
  }

  export type StudentMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    department?: SortOrder
    class?: SortOrder
    section?: SortOrder
    year?: SortOrder
    enrollmentDate?: SortOrder
    status?: SortOrder
    gpa?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    department?: SortOrder
    class?: SortOrder
    section?: SortOrder
    year?: SortOrder
    enrollmentDate?: SortOrder
    status?: SortOrder
    gpa?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentSumOrderByAggregateInput = {
    id?: SortOrder
    gpa?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StudentRelationFilter = {
    is?: StudentWhereInput
    isNot?: StudentWhereInput
  }

  export type StudentAttendanceCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    classId?: SortOrder
    date?: SortOrder
    status?: SortOrder
    timestamp?: SortOrder
    studentLatitude?: SortOrder
    studentLongitude?: SortOrder
    distanceFromClass?: SortOrder
    locationVerified?: SortOrder
    createdAt?: SortOrder
  }

  export type StudentAttendanceAvgOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    studentLatitude?: SortOrder
    studentLongitude?: SortOrder
    distanceFromClass?: SortOrder
  }

  export type StudentAttendanceMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    classId?: SortOrder
    date?: SortOrder
    status?: SortOrder
    timestamp?: SortOrder
    studentLatitude?: SortOrder
    studentLongitude?: SortOrder
    distanceFromClass?: SortOrder
    locationVerified?: SortOrder
    createdAt?: SortOrder
  }

  export type StudentAttendanceMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    classId?: SortOrder
    date?: SortOrder
    status?: SortOrder
    timestamp?: SortOrder
    studentLatitude?: SortOrder
    studentLongitude?: SortOrder
    distanceFromClass?: SortOrder
    locationVerified?: SortOrder
    createdAt?: SortOrder
  }

  export type StudentAttendanceSumOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    studentLatitude?: SortOrder
    studentLongitude?: SortOrder
    distanceFromClass?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AttendanceCountOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    type?: SortOrder
    timestamp?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type AttendanceAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type AttendanceMaxOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    type?: SortOrder
    timestamp?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type AttendanceMinOrderByAggregateInput = {
    id?: SortOrder
    employeeId?: SortOrder
    type?: SortOrder
    timestamp?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type AttendanceSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ClassCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    faculty?: SortOrder
    maxStudents?: SortOrder
    schedule?: SortOrder
    room?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    geofenceRadius?: SortOrder
    geofenceEnabled?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClassAvgOrderByAggregateInput = {
    id?: SortOrder
    maxStudents?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    geofenceRadius?: SortOrder
    createdBy?: SortOrder
  }

  export type ClassMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    faculty?: SortOrder
    maxStudents?: SortOrder
    schedule?: SortOrder
    room?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    geofenceRadius?: SortOrder
    geofenceEnabled?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClassMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    faculty?: SortOrder
    maxStudents?: SortOrder
    schedule?: SortOrder
    room?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    geofenceRadius?: SortOrder
    geofenceEnabled?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClassSumOrderByAggregateInput = {
    id?: SortOrder
    maxStudents?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    geofenceRadius?: SortOrder
    createdBy?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type QRSessionCountOrderByAggregateInput = {
    id?: SortOrder
    classId?: SortOrder
    className?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    radius?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    isActive?: SortOrder
  }

  export type QRSessionAvgOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    radius?: SortOrder
  }

  export type QRSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    classId?: SortOrder
    className?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    radius?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    isActive?: SortOrder
  }

  export type QRSessionMinOrderByAggregateInput = {
    id?: SortOrder
    classId?: SortOrder
    className?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    radius?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    expiresAt?: SortOrder
    isActive?: SortOrder
  }

  export type QRSessionSumOrderByAggregateInput = {
    latitude?: SortOrder
    longitude?: SortOrder
    radius?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type GeofenceSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    defaultRadius?: SortOrder
    enabled?: SortOrder
    allowOverride?: SortOrder
    accuracyThreshold?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GeofenceSettingsAvgOrderByAggregateInput = {
    id?: SortOrder
    defaultRadius?: SortOrder
    accuracyThreshold?: SortOrder
  }

  export type GeofenceSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    defaultRadius?: SortOrder
    enabled?: SortOrder
    allowOverride?: SortOrder
    accuracyThreshold?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GeofenceSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    defaultRadius?: SortOrder
    enabled?: SortOrder
    allowOverride?: SortOrder
    accuracyThreshold?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GeofenceSettingsSumOrderByAggregateInput = {
    id?: SortOrder
    defaultRadius?: SortOrder
    accuracyThreshold?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type AttendanceCreateNestedManyWithoutUserInput = {
    create?: XOR<AttendanceCreateWithoutUserInput, AttendanceUncheckedCreateWithoutUserInput> | AttendanceCreateWithoutUserInput[] | AttendanceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutUserInput | AttendanceCreateOrConnectWithoutUserInput[]
    createMany?: AttendanceCreateManyUserInputEnvelope
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
  }

  export type AttendanceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AttendanceCreateWithoutUserInput, AttendanceUncheckedCreateWithoutUserInput> | AttendanceCreateWithoutUserInput[] | AttendanceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutUserInput | AttendanceCreateOrConnectWithoutUserInput[]
    createMany?: AttendanceCreateManyUserInputEnvelope
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AttendanceUpdateManyWithoutUserNestedInput = {
    create?: XOR<AttendanceCreateWithoutUserInput, AttendanceUncheckedCreateWithoutUserInput> | AttendanceCreateWithoutUserInput[] | AttendanceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutUserInput | AttendanceCreateOrConnectWithoutUserInput[]
    upsert?: AttendanceUpsertWithWhereUniqueWithoutUserInput | AttendanceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AttendanceCreateManyUserInputEnvelope
    set?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    disconnect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    delete?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    update?: AttendanceUpdateWithWhereUniqueWithoutUserInput | AttendanceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AttendanceUpdateManyWithWhereWithoutUserInput | AttendanceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AttendanceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AttendanceCreateWithoutUserInput, AttendanceUncheckedCreateWithoutUserInput> | AttendanceCreateWithoutUserInput[] | AttendanceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutUserInput | AttendanceCreateOrConnectWithoutUserInput[]
    upsert?: AttendanceUpsertWithWhereUniqueWithoutUserInput | AttendanceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AttendanceCreateManyUserInputEnvelope
    set?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    disconnect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    delete?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    update?: AttendanceUpdateWithWhereUniqueWithoutUserInput | AttendanceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AttendanceUpdateManyWithWhereWithoutUserInput | AttendanceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
  }

  export type StudentAttendanceCreateNestedManyWithoutStudentInput = {
    create?: XOR<StudentAttendanceCreateWithoutStudentInput, StudentAttendanceUncheckedCreateWithoutStudentInput> | StudentAttendanceCreateWithoutStudentInput[] | StudentAttendanceUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: StudentAttendanceCreateOrConnectWithoutStudentInput | StudentAttendanceCreateOrConnectWithoutStudentInput[]
    createMany?: StudentAttendanceCreateManyStudentInputEnvelope
    connect?: StudentAttendanceWhereUniqueInput | StudentAttendanceWhereUniqueInput[]
  }

  export type StudentAttendanceUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<StudentAttendanceCreateWithoutStudentInput, StudentAttendanceUncheckedCreateWithoutStudentInput> | StudentAttendanceCreateWithoutStudentInput[] | StudentAttendanceUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: StudentAttendanceCreateOrConnectWithoutStudentInput | StudentAttendanceCreateOrConnectWithoutStudentInput[]
    createMany?: StudentAttendanceCreateManyStudentInputEnvelope
    connect?: StudentAttendanceWhereUniqueInput | StudentAttendanceWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StudentAttendanceUpdateManyWithoutStudentNestedInput = {
    create?: XOR<StudentAttendanceCreateWithoutStudentInput, StudentAttendanceUncheckedCreateWithoutStudentInput> | StudentAttendanceCreateWithoutStudentInput[] | StudentAttendanceUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: StudentAttendanceCreateOrConnectWithoutStudentInput | StudentAttendanceCreateOrConnectWithoutStudentInput[]
    upsert?: StudentAttendanceUpsertWithWhereUniqueWithoutStudentInput | StudentAttendanceUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: StudentAttendanceCreateManyStudentInputEnvelope
    set?: StudentAttendanceWhereUniqueInput | StudentAttendanceWhereUniqueInput[]
    disconnect?: StudentAttendanceWhereUniqueInput | StudentAttendanceWhereUniqueInput[]
    delete?: StudentAttendanceWhereUniqueInput | StudentAttendanceWhereUniqueInput[]
    connect?: StudentAttendanceWhereUniqueInput | StudentAttendanceWhereUniqueInput[]
    update?: StudentAttendanceUpdateWithWhereUniqueWithoutStudentInput | StudentAttendanceUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: StudentAttendanceUpdateManyWithWhereWithoutStudentInput | StudentAttendanceUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: StudentAttendanceScalarWhereInput | StudentAttendanceScalarWhereInput[]
  }

  export type StudentAttendanceUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<StudentAttendanceCreateWithoutStudentInput, StudentAttendanceUncheckedCreateWithoutStudentInput> | StudentAttendanceCreateWithoutStudentInput[] | StudentAttendanceUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: StudentAttendanceCreateOrConnectWithoutStudentInput | StudentAttendanceCreateOrConnectWithoutStudentInput[]
    upsert?: StudentAttendanceUpsertWithWhereUniqueWithoutStudentInput | StudentAttendanceUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: StudentAttendanceCreateManyStudentInputEnvelope
    set?: StudentAttendanceWhereUniqueInput | StudentAttendanceWhereUniqueInput[]
    disconnect?: StudentAttendanceWhereUniqueInput | StudentAttendanceWhereUniqueInput[]
    delete?: StudentAttendanceWhereUniqueInput | StudentAttendanceWhereUniqueInput[]
    connect?: StudentAttendanceWhereUniqueInput | StudentAttendanceWhereUniqueInput[]
    update?: StudentAttendanceUpdateWithWhereUniqueWithoutStudentInput | StudentAttendanceUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: StudentAttendanceUpdateManyWithWhereWithoutStudentInput | StudentAttendanceUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: StudentAttendanceScalarWhereInput | StudentAttendanceScalarWhereInput[]
  }

  export type StudentCreateNestedOneWithoutAttendanceInput = {
    create?: XOR<StudentCreateWithoutAttendanceInput, StudentUncheckedCreateWithoutAttendanceInput>
    connectOrCreate?: StudentCreateOrConnectWithoutAttendanceInput
    connect?: StudentWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type StudentUpdateOneRequiredWithoutAttendanceNestedInput = {
    create?: XOR<StudentCreateWithoutAttendanceInput, StudentUncheckedCreateWithoutAttendanceInput>
    connectOrCreate?: StudentCreateOrConnectWithoutAttendanceInput
    upsert?: StudentUpsertWithoutAttendanceInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutAttendanceInput, StudentUpdateWithoutAttendanceInput>, StudentUncheckedUpdateWithoutAttendanceInput>
  }

  export type UserCreateNestedOneWithoutAttendanceInput = {
    create?: XOR<UserCreateWithoutAttendanceInput, UserUncheckedCreateWithoutAttendanceInput>
    connectOrCreate?: UserCreateOrConnectWithoutAttendanceInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAttendanceNestedInput = {
    create?: XOR<UserCreateWithoutAttendanceInput, UserUncheckedCreateWithoutAttendanceInput>
    connectOrCreate?: UserCreateOrConnectWithoutAttendanceInput
    upsert?: UserUpsertWithoutAttendanceInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAttendanceInput, UserUpdateWithoutAttendanceInput>, UserUncheckedUpdateWithoutAttendanceInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type AttendanceCreateWithoutUserInput = {
    employeeId: string
    type: string
    timestamp?: Date | string
    createdAt?: Date | string
  }

  export type AttendanceUncheckedCreateWithoutUserInput = {
    id?: number
    employeeId: string
    type: string
    timestamp?: Date | string
    createdAt?: Date | string
  }

  export type AttendanceCreateOrConnectWithoutUserInput = {
    where: AttendanceWhereUniqueInput
    create: XOR<AttendanceCreateWithoutUserInput, AttendanceUncheckedCreateWithoutUserInput>
  }

  export type AttendanceCreateManyUserInputEnvelope = {
    data: AttendanceCreateManyUserInput | AttendanceCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AttendanceUpsertWithWhereUniqueWithoutUserInput = {
    where: AttendanceWhereUniqueInput
    update: XOR<AttendanceUpdateWithoutUserInput, AttendanceUncheckedUpdateWithoutUserInput>
    create: XOR<AttendanceCreateWithoutUserInput, AttendanceUncheckedCreateWithoutUserInput>
  }

  export type AttendanceUpdateWithWhereUniqueWithoutUserInput = {
    where: AttendanceWhereUniqueInput
    data: XOR<AttendanceUpdateWithoutUserInput, AttendanceUncheckedUpdateWithoutUserInput>
  }

  export type AttendanceUpdateManyWithWhereWithoutUserInput = {
    where: AttendanceScalarWhereInput
    data: XOR<AttendanceUpdateManyMutationInput, AttendanceUncheckedUpdateManyWithoutUserInput>
  }

  export type AttendanceScalarWhereInput = {
    AND?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
    OR?: AttendanceScalarWhereInput[]
    NOT?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
    id?: IntFilter<"Attendance"> | number
    employeeId?: StringFilter<"Attendance"> | string
    type?: StringFilter<"Attendance"> | string
    timestamp?: DateTimeFilter<"Attendance"> | Date | string
    userId?: IntFilter<"Attendance"> | number
    createdAt?: DateTimeFilter<"Attendance"> | Date | string
  }

  export type StudentAttendanceCreateWithoutStudentInput = {
    classId: string
    date?: Date | string
    status: string
    timestamp?: string | null
    studentLatitude?: number | null
    studentLongitude?: number | null
    distanceFromClass?: number | null
    locationVerified?: boolean
    createdAt?: Date | string
  }

  export type StudentAttendanceUncheckedCreateWithoutStudentInput = {
    id?: number
    classId: string
    date?: Date | string
    status: string
    timestamp?: string | null
    studentLatitude?: number | null
    studentLongitude?: number | null
    distanceFromClass?: number | null
    locationVerified?: boolean
    createdAt?: Date | string
  }

  export type StudentAttendanceCreateOrConnectWithoutStudentInput = {
    where: StudentAttendanceWhereUniqueInput
    create: XOR<StudentAttendanceCreateWithoutStudentInput, StudentAttendanceUncheckedCreateWithoutStudentInput>
  }

  export type StudentAttendanceCreateManyStudentInputEnvelope = {
    data: StudentAttendanceCreateManyStudentInput | StudentAttendanceCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type StudentAttendanceUpsertWithWhereUniqueWithoutStudentInput = {
    where: StudentAttendanceWhereUniqueInput
    update: XOR<StudentAttendanceUpdateWithoutStudentInput, StudentAttendanceUncheckedUpdateWithoutStudentInput>
    create: XOR<StudentAttendanceCreateWithoutStudentInput, StudentAttendanceUncheckedCreateWithoutStudentInput>
  }

  export type StudentAttendanceUpdateWithWhereUniqueWithoutStudentInput = {
    where: StudentAttendanceWhereUniqueInput
    data: XOR<StudentAttendanceUpdateWithoutStudentInput, StudentAttendanceUncheckedUpdateWithoutStudentInput>
  }

  export type StudentAttendanceUpdateManyWithWhereWithoutStudentInput = {
    where: StudentAttendanceScalarWhereInput
    data: XOR<StudentAttendanceUpdateManyMutationInput, StudentAttendanceUncheckedUpdateManyWithoutStudentInput>
  }

  export type StudentAttendanceScalarWhereInput = {
    AND?: StudentAttendanceScalarWhereInput | StudentAttendanceScalarWhereInput[]
    OR?: StudentAttendanceScalarWhereInput[]
    NOT?: StudentAttendanceScalarWhereInput | StudentAttendanceScalarWhereInput[]
    id?: IntFilter<"StudentAttendance"> | number
    studentId?: IntFilter<"StudentAttendance"> | number
    classId?: StringFilter<"StudentAttendance"> | string
    date?: DateTimeFilter<"StudentAttendance"> | Date | string
    status?: StringFilter<"StudentAttendance"> | string
    timestamp?: StringNullableFilter<"StudentAttendance"> | string | null
    studentLatitude?: FloatNullableFilter<"StudentAttendance"> | number | null
    studentLongitude?: FloatNullableFilter<"StudentAttendance"> | number | null
    distanceFromClass?: FloatNullableFilter<"StudentAttendance"> | number | null
    locationVerified?: BoolFilter<"StudentAttendance"> | boolean
    createdAt?: DateTimeFilter<"StudentAttendance"> | Date | string
  }

  export type StudentCreateWithoutAttendanceInput = {
    studentId: string
    name: string
    email: string
    password?: string
    phone?: string | null
    department: string
    class: string
    section: string
    year: string
    enrollmentDate?: Date | string
    status?: string
    gpa?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentUncheckedCreateWithoutAttendanceInput = {
    id?: number
    studentId: string
    name: string
    email: string
    password?: string
    phone?: string | null
    department: string
    class: string
    section: string
    year: string
    enrollmentDate?: Date | string
    status?: string
    gpa?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentCreateOrConnectWithoutAttendanceInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutAttendanceInput, StudentUncheckedCreateWithoutAttendanceInput>
  }

  export type StudentUpsertWithoutAttendanceInput = {
    update: XOR<StudentUpdateWithoutAttendanceInput, StudentUncheckedUpdateWithoutAttendanceInput>
    create: XOR<StudentCreateWithoutAttendanceInput, StudentUncheckedCreateWithoutAttendanceInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutAttendanceInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutAttendanceInput, StudentUncheckedUpdateWithoutAttendanceInput>
  }

  export type StudentUpdateWithoutAttendanceInput = {
    studentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: StringFieldUpdateOperationsInput | string
    class?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    enrollmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    gpa?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentUncheckedUpdateWithoutAttendanceInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    department?: StringFieldUpdateOperationsInput | string
    class?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    year?: StringFieldUpdateOperationsInput | string
    enrollmentDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    gpa?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutAttendanceInput = {
    email: string
    password: string
    name: string
    employeeId?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutAttendanceInput = {
    id?: number
    email: string
    password: string
    name: string
    employeeId?: string | null
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutAttendanceInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAttendanceInput, UserUncheckedCreateWithoutAttendanceInput>
  }

  export type UserUpsertWithoutAttendanceInput = {
    update: XOR<UserUpdateWithoutAttendanceInput, UserUncheckedUpdateWithoutAttendanceInput>
    create: XOR<UserCreateWithoutAttendanceInput, UserUncheckedCreateWithoutAttendanceInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAttendanceInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAttendanceInput, UserUncheckedUpdateWithoutAttendanceInput>
  }

  export type UserUpdateWithoutAttendanceInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutAttendanceInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    employeeId?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceCreateManyUserInput = {
    id?: number
    employeeId: string
    type: string
    timestamp?: Date | string
    createdAt?: Date | string
  }

  export type AttendanceUpdateWithoutUserInput = {
    employeeId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    employeeId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    employeeId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentAttendanceCreateManyStudentInput = {
    id?: number
    classId: string
    date?: Date | string
    status: string
    timestamp?: string | null
    studentLatitude?: number | null
    studentLongitude?: number | null
    distanceFromClass?: number | null
    locationVerified?: boolean
    createdAt?: Date | string
  }

  export type StudentAttendanceUpdateWithoutStudentInput = {
    classId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: NullableStringFieldUpdateOperationsInput | string | null
    studentLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    studentLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    distanceFromClass?: NullableFloatFieldUpdateOperationsInput | number | null
    locationVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentAttendanceUncheckedUpdateWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    classId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: NullableStringFieldUpdateOperationsInput | string | null
    studentLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    studentLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    distanceFromClass?: NullableFloatFieldUpdateOperationsInput | number | null
    locationVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentAttendanceUncheckedUpdateManyWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    classId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    timestamp?: NullableStringFieldUpdateOperationsInput | string | null
    studentLatitude?: NullableFloatFieldUpdateOperationsInput | number | null
    studentLongitude?: NullableFloatFieldUpdateOperationsInput | number | null
    distanceFromClass?: NullableFloatFieldUpdateOperationsInput | number | null
    locationVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StudentCountOutputTypeDefaultArgs instead
     */
    export type StudentCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StudentCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StudentDefaultArgs instead
     */
    export type StudentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StudentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StudentAttendanceDefaultArgs instead
     */
    export type StudentAttendanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StudentAttendanceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AttendanceDefaultArgs instead
     */
    export type AttendanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AttendanceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ClassDefaultArgs instead
     */
    export type ClassArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ClassDefaultArgs<ExtArgs>
    /**
     * @deprecated Use QRSessionDefaultArgs instead
     */
    export type QRSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = QRSessionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GeofenceSettingsDefaultArgs instead
     */
    export type GeofenceSettingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GeofenceSettingsDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}