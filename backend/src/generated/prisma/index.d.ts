
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
 * Model StaffAttendance
 * 
 */
export type StaffAttendance = $Result.DefaultSelection<Prisma.$StaffAttendancePayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model MenuItem
 * 
 */
export type MenuItem = $Result.DefaultSelection<Prisma.$MenuItemPayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model KotTicket
 * 
 */
export type KotTicket = $Result.DefaultSelection<Prisma.$KotTicketPayload>
/**
 * Model KotItem
 * 
 */
export type KotItem = $Result.DefaultSelection<Prisma.$KotItemPayload>
/**
 * Model BillSequence
 * 
 */
export type BillSequence = $Result.DefaultSelection<Prisma.$BillSequencePayload>
/**
 * Model OrderItem
 * 
 */
export type OrderItem = $Result.DefaultSelection<Prisma.$OrderItemPayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model Expense
 * 
 */
export type Expense = $Result.DefaultSelection<Prisma.$ExpensePayload>
/**
 * Model Supplier
 * 
 */
export type Supplier = $Result.DefaultSelection<Prisma.$SupplierPayload>
/**
 * Model Purchase
 * 
 */
export type Purchase = $Result.DefaultSelection<Prisma.$PurchasePayload>
/**
 * Model PurchaseItem
 * 
 */
export type PurchaseItem = $Result.DefaultSelection<Prisma.$PurchaseItemPayload>

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
   * `prisma.staffAttendance`: Exposes CRUD operations for the **StaffAttendance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StaffAttendances
    * const staffAttendances = await prisma.staffAttendance.findMany()
    * ```
    */
  get staffAttendance(): Prisma.StaffAttendanceDelegate<ExtArgs>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs>;

  /**
   * `prisma.menuItem`: Exposes CRUD operations for the **MenuItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MenuItems
    * const menuItems = await prisma.menuItem.findMany()
    * ```
    */
  get menuItem(): Prisma.MenuItemDelegate<ExtArgs>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs>;

  /**
   * `prisma.kotTicket`: Exposes CRUD operations for the **KotTicket** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more KotTickets
    * const kotTickets = await prisma.kotTicket.findMany()
    * ```
    */
  get kotTicket(): Prisma.KotTicketDelegate<ExtArgs>;

  /**
   * `prisma.kotItem`: Exposes CRUD operations for the **KotItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more KotItems
    * const kotItems = await prisma.kotItem.findMany()
    * ```
    */
  get kotItem(): Prisma.KotItemDelegate<ExtArgs>;

  /**
   * `prisma.billSequence`: Exposes CRUD operations for the **BillSequence** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BillSequences
    * const billSequences = await prisma.billSequence.findMany()
    * ```
    */
  get billSequence(): Prisma.BillSequenceDelegate<ExtArgs>;

  /**
   * `prisma.orderItem`: Exposes CRUD operations for the **OrderItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderItems
    * const orderItems = await prisma.orderItem.findMany()
    * ```
    */
  get orderItem(): Prisma.OrderItemDelegate<ExtArgs>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs>;

  /**
   * `prisma.expense`: Exposes CRUD operations for the **Expense** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Expenses
    * const expenses = await prisma.expense.findMany()
    * ```
    */
  get expense(): Prisma.ExpenseDelegate<ExtArgs>;

  /**
   * `prisma.supplier`: Exposes CRUD operations for the **Supplier** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Suppliers
    * const suppliers = await prisma.supplier.findMany()
    * ```
    */
  get supplier(): Prisma.SupplierDelegate<ExtArgs>;

  /**
   * `prisma.purchase`: Exposes CRUD operations for the **Purchase** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Purchases
    * const purchases = await prisma.purchase.findMany()
    * ```
    */
  get purchase(): Prisma.PurchaseDelegate<ExtArgs>;

  /**
   * `prisma.purchaseItem`: Exposes CRUD operations for the **PurchaseItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PurchaseItems
    * const purchaseItems = await prisma.purchaseItem.findMany()
    * ```
    */
  get purchaseItem(): Prisma.PurchaseItemDelegate<ExtArgs>;
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
    StaffAttendance: 'StaffAttendance',
    Category: 'Category',
    MenuItem: 'MenuItem',
    Order: 'Order',
    KotTicket: 'KotTicket',
    KotItem: 'KotItem',
    BillSequence: 'BillSequence',
    OrderItem: 'OrderItem',
    Payment: 'Payment',
    Expense: 'Expense',
    Supplier: 'Supplier',
    Purchase: 'Purchase',
    PurchaseItem: 'PurchaseItem'
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
      modelProps: "user" | "staffAttendance" | "category" | "menuItem" | "order" | "kotTicket" | "kotItem" | "billSequence" | "orderItem" | "payment" | "expense" | "supplier" | "purchase" | "purchaseItem"
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
      StaffAttendance: {
        payload: Prisma.$StaffAttendancePayload<ExtArgs>
        fields: Prisma.StaffAttendanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StaffAttendanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffAttendancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StaffAttendanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffAttendancePayload>
          }
          findFirst: {
            args: Prisma.StaffAttendanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffAttendancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StaffAttendanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffAttendancePayload>
          }
          findMany: {
            args: Prisma.StaffAttendanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffAttendancePayload>[]
          }
          create: {
            args: Prisma.StaffAttendanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffAttendancePayload>
          }
          createMany: {
            args: Prisma.StaffAttendanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StaffAttendanceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffAttendancePayload>[]
          }
          delete: {
            args: Prisma.StaffAttendanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffAttendancePayload>
          }
          update: {
            args: Prisma.StaffAttendanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffAttendancePayload>
          }
          deleteMany: {
            args: Prisma.StaffAttendanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StaffAttendanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StaffAttendanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffAttendancePayload>
          }
          aggregate: {
            args: Prisma.StaffAttendanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStaffAttendance>
          }
          groupBy: {
            args: Prisma.StaffAttendanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<StaffAttendanceGroupByOutputType>[]
          }
          count: {
            args: Prisma.StaffAttendanceCountArgs<ExtArgs>
            result: $Utils.Optional<StaffAttendanceCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      MenuItem: {
        payload: Prisma.$MenuItemPayload<ExtArgs>
        fields: Prisma.MenuItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MenuItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MenuItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>
          }
          findFirst: {
            args: Prisma.MenuItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MenuItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>
          }
          findMany: {
            args: Prisma.MenuItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>[]
          }
          create: {
            args: Prisma.MenuItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>
          }
          createMany: {
            args: Prisma.MenuItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MenuItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>[]
          }
          delete: {
            args: Prisma.MenuItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>
          }
          update: {
            args: Prisma.MenuItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>
          }
          deleteMany: {
            args: Prisma.MenuItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MenuItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MenuItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuItemPayload>
          }
          aggregate: {
            args: Prisma.MenuItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMenuItem>
          }
          groupBy: {
            args: Prisma.MenuItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<MenuItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.MenuItemCountArgs<ExtArgs>
            result: $Utils.Optional<MenuItemCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      KotTicket: {
        payload: Prisma.$KotTicketPayload<ExtArgs>
        fields: Prisma.KotTicketFieldRefs
        operations: {
          findUnique: {
            args: Prisma.KotTicketFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KotTicketPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KotTicketFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KotTicketPayload>
          }
          findFirst: {
            args: Prisma.KotTicketFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KotTicketPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KotTicketFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KotTicketPayload>
          }
          findMany: {
            args: Prisma.KotTicketFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KotTicketPayload>[]
          }
          create: {
            args: Prisma.KotTicketCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KotTicketPayload>
          }
          createMany: {
            args: Prisma.KotTicketCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.KotTicketCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KotTicketPayload>[]
          }
          delete: {
            args: Prisma.KotTicketDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KotTicketPayload>
          }
          update: {
            args: Prisma.KotTicketUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KotTicketPayload>
          }
          deleteMany: {
            args: Prisma.KotTicketDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.KotTicketUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.KotTicketUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KotTicketPayload>
          }
          aggregate: {
            args: Prisma.KotTicketAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKotTicket>
          }
          groupBy: {
            args: Prisma.KotTicketGroupByArgs<ExtArgs>
            result: $Utils.Optional<KotTicketGroupByOutputType>[]
          }
          count: {
            args: Prisma.KotTicketCountArgs<ExtArgs>
            result: $Utils.Optional<KotTicketCountAggregateOutputType> | number
          }
        }
      }
      KotItem: {
        payload: Prisma.$KotItemPayload<ExtArgs>
        fields: Prisma.KotItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.KotItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KotItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KotItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KotItemPayload>
          }
          findFirst: {
            args: Prisma.KotItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KotItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KotItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KotItemPayload>
          }
          findMany: {
            args: Prisma.KotItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KotItemPayload>[]
          }
          create: {
            args: Prisma.KotItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KotItemPayload>
          }
          createMany: {
            args: Prisma.KotItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.KotItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KotItemPayload>[]
          }
          delete: {
            args: Prisma.KotItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KotItemPayload>
          }
          update: {
            args: Prisma.KotItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KotItemPayload>
          }
          deleteMany: {
            args: Prisma.KotItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.KotItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.KotItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KotItemPayload>
          }
          aggregate: {
            args: Prisma.KotItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKotItem>
          }
          groupBy: {
            args: Prisma.KotItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<KotItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.KotItemCountArgs<ExtArgs>
            result: $Utils.Optional<KotItemCountAggregateOutputType> | number
          }
        }
      }
      BillSequence: {
        payload: Prisma.$BillSequencePayload<ExtArgs>
        fields: Prisma.BillSequenceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BillSequenceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillSequencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BillSequenceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillSequencePayload>
          }
          findFirst: {
            args: Prisma.BillSequenceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillSequencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BillSequenceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillSequencePayload>
          }
          findMany: {
            args: Prisma.BillSequenceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillSequencePayload>[]
          }
          create: {
            args: Prisma.BillSequenceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillSequencePayload>
          }
          createMany: {
            args: Prisma.BillSequenceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BillSequenceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillSequencePayload>[]
          }
          delete: {
            args: Prisma.BillSequenceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillSequencePayload>
          }
          update: {
            args: Prisma.BillSequenceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillSequencePayload>
          }
          deleteMany: {
            args: Prisma.BillSequenceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BillSequenceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BillSequenceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillSequencePayload>
          }
          aggregate: {
            args: Prisma.BillSequenceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBillSequence>
          }
          groupBy: {
            args: Prisma.BillSequenceGroupByArgs<ExtArgs>
            result: $Utils.Optional<BillSequenceGroupByOutputType>[]
          }
          count: {
            args: Prisma.BillSequenceCountArgs<ExtArgs>
            result: $Utils.Optional<BillSequenceCountAggregateOutputType> | number
          }
        }
      }
      OrderItem: {
        payload: Prisma.$OrderItemPayload<ExtArgs>
        fields: Prisma.OrderItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findFirst: {
            args: Prisma.OrderItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findMany: {
            args: Prisma.OrderItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          create: {
            args: Prisma.OrderItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          createMany: {
            args: Prisma.OrderItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          delete: {
            args: Prisma.OrderItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          update: {
            args: Prisma.OrderItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          deleteMany: {
            args: Prisma.OrderItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrderItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          aggregate: {
            args: Prisma.OrderItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderItem>
          }
          groupBy: {
            args: Prisma.OrderItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderItemCountArgs<ExtArgs>
            result: $Utils.Optional<OrderItemCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      Expense: {
        payload: Prisma.$ExpensePayload<ExtArgs>
        fields: Prisma.ExpenseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExpenseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExpenseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          findFirst: {
            args: Prisma.ExpenseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExpenseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          findMany: {
            args: Prisma.ExpenseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>[]
          }
          create: {
            args: Prisma.ExpenseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          createMany: {
            args: Prisma.ExpenseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExpenseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>[]
          }
          delete: {
            args: Prisma.ExpenseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          update: {
            args: Prisma.ExpenseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          deleteMany: {
            args: Prisma.ExpenseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExpenseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ExpenseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpensePayload>
          }
          aggregate: {
            args: Prisma.ExpenseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExpense>
          }
          groupBy: {
            args: Prisma.ExpenseGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExpenseGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExpenseCountArgs<ExtArgs>
            result: $Utils.Optional<ExpenseCountAggregateOutputType> | number
          }
        }
      }
      Supplier: {
        payload: Prisma.$SupplierPayload<ExtArgs>
        fields: Prisma.SupplierFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SupplierFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SupplierFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          findFirst: {
            args: Prisma.SupplierFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SupplierFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          findMany: {
            args: Prisma.SupplierFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>[]
          }
          create: {
            args: Prisma.SupplierCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          createMany: {
            args: Prisma.SupplierCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SupplierCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>[]
          }
          delete: {
            args: Prisma.SupplierDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          update: {
            args: Prisma.SupplierUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          deleteMany: {
            args: Prisma.SupplierDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SupplierUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SupplierUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SupplierPayload>
          }
          aggregate: {
            args: Prisma.SupplierAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSupplier>
          }
          groupBy: {
            args: Prisma.SupplierGroupByArgs<ExtArgs>
            result: $Utils.Optional<SupplierGroupByOutputType>[]
          }
          count: {
            args: Prisma.SupplierCountArgs<ExtArgs>
            result: $Utils.Optional<SupplierCountAggregateOutputType> | number
          }
        }
      }
      Purchase: {
        payload: Prisma.$PurchasePayload<ExtArgs>
        fields: Prisma.PurchaseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PurchaseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PurchaseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload>
          }
          findFirst: {
            args: Prisma.PurchaseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PurchaseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload>
          }
          findMany: {
            args: Prisma.PurchaseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload>[]
          }
          create: {
            args: Prisma.PurchaseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload>
          }
          createMany: {
            args: Prisma.PurchaseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PurchaseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload>[]
          }
          delete: {
            args: Prisma.PurchaseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload>
          }
          update: {
            args: Prisma.PurchaseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload>
          }
          deleteMany: {
            args: Prisma.PurchaseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PurchaseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PurchaseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchasePayload>
          }
          aggregate: {
            args: Prisma.PurchaseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePurchase>
          }
          groupBy: {
            args: Prisma.PurchaseGroupByArgs<ExtArgs>
            result: $Utils.Optional<PurchaseGroupByOutputType>[]
          }
          count: {
            args: Prisma.PurchaseCountArgs<ExtArgs>
            result: $Utils.Optional<PurchaseCountAggregateOutputType> | number
          }
        }
      }
      PurchaseItem: {
        payload: Prisma.$PurchaseItemPayload<ExtArgs>
        fields: Prisma.PurchaseItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PurchaseItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PurchaseItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseItemPayload>
          }
          findFirst: {
            args: Prisma.PurchaseItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PurchaseItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseItemPayload>
          }
          findMany: {
            args: Prisma.PurchaseItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseItemPayload>[]
          }
          create: {
            args: Prisma.PurchaseItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseItemPayload>
          }
          createMany: {
            args: Prisma.PurchaseItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PurchaseItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseItemPayload>[]
          }
          delete: {
            args: Prisma.PurchaseItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseItemPayload>
          }
          update: {
            args: Prisma.PurchaseItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseItemPayload>
          }
          deleteMany: {
            args: Prisma.PurchaseItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PurchaseItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PurchaseItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PurchaseItemPayload>
          }
          aggregate: {
            args: Prisma.PurchaseItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePurchaseItem>
          }
          groupBy: {
            args: Prisma.PurchaseItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<PurchaseItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.PurchaseItemCountArgs<ExtArgs>
            result: $Utils.Optional<PurchaseItemCountAggregateOutputType> | number
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
    attendances: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendances?: boolean | UserCountOutputTypeCountAttendancesArgs
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
  export type UserCountOutputTypeCountAttendancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StaffAttendanceWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    menuItems: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    menuItems?: boolean | CategoryCountOutputTypeCountMenuItemsArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountMenuItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MenuItemWhereInput
  }


  /**
   * Count Type MenuItemCountOutputType
   */

  export type MenuItemCountOutputType = {
    orderItems: number
  }

  export type MenuItemCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orderItems?: boolean | MenuItemCountOutputTypeCountOrderItemsArgs
  }

  // Custom InputTypes
  /**
   * MenuItemCountOutputType without action
   */
  export type MenuItemCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItemCountOutputType
     */
    select?: MenuItemCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MenuItemCountOutputType without action
   */
  export type MenuItemCountOutputTypeCountOrderItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }


  /**
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    items: number
    payments: number
    kotTickets: number
  }

  export type OrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | OrderCountOutputTypeCountItemsArgs
    payments?: boolean | OrderCountOutputTypeCountPaymentsArgs
    kotTickets?: boolean | OrderCountOutputTypeCountKotTicketsArgs
  }

  // Custom InputTypes
  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountKotTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KotTicketWhereInput
  }


  /**
   * Count Type KotTicketCountOutputType
   */

  export type KotTicketCountOutputType = {
    items: number
  }

  export type KotTicketCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | KotTicketCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * KotTicketCountOutputType without action
   */
  export type KotTicketCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KotTicketCountOutputType
     */
    select?: KotTicketCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * KotTicketCountOutputType without action
   */
  export type KotTicketCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KotItemWhereInput
  }


  /**
   * Count Type SupplierCountOutputType
   */

  export type SupplierCountOutputType = {
    purchases: number
  }

  export type SupplierCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    purchases?: boolean | SupplierCountOutputTypeCountPurchasesArgs
  }

  // Custom InputTypes
  /**
   * SupplierCountOutputType without action
   */
  export type SupplierCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SupplierCountOutputType
     */
    select?: SupplierCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SupplierCountOutputType without action
   */
  export type SupplierCountOutputTypeCountPurchasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PurchaseWhereInput
  }


  /**
   * Count Type PurchaseCountOutputType
   */

  export type PurchaseCountOutputType = {
    items: number
  }

  export type PurchaseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | PurchaseCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * PurchaseCountOutputType without action
   */
  export type PurchaseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseCountOutputType
     */
    select?: PurchaseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PurchaseCountOutputType without action
   */
  export type PurchaseCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PurchaseItemWhereInput
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
    name: string | null
    role: string | null
    password: string | null
    featureAccessOverrides: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    name: string | null
    role: string | null
    password: string | null
    featureAccessOverrides: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    role: number
    password: number
    featureAccessOverrides: number
    createdAt: number
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
    name?: true
    role?: true
    password?: true
    featureAccessOverrides?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    role?: true
    password?: true
    featureAccessOverrides?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    role?: true
    password?: true
    featureAccessOverrides?: true
    createdAt?: true
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
    name: string
    role: string
    password: string
    featureAccessOverrides: string | null
    createdAt: Date
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
    name?: boolean
    role?: boolean
    password?: boolean
    featureAccessOverrides?: boolean
    createdAt?: boolean
    attendances?: boolean | User$attendancesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    role?: boolean
    password?: boolean
    featureAccessOverrides?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    role?: boolean
    password?: boolean
    featureAccessOverrides?: boolean
    createdAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendances?: boolean | User$attendancesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      attendances: Prisma.$StaffAttendancePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      role: string
      password: string
      featureAccessOverrides: string | null
      createdAt: Date
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
    attendances<T extends User$attendancesArgs<ExtArgs> = {}>(args?: Subset<T, User$attendancesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffAttendancePayload<ExtArgs>, T, "findMany"> | Null>
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
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly featureAccessOverrides: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
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
   * User.attendances
   */
  export type User$attendancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffAttendance
     */
    select?: StaffAttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffAttendanceInclude<ExtArgs> | null
    where?: StaffAttendanceWhereInput
    orderBy?: StaffAttendanceOrderByWithRelationInput | StaffAttendanceOrderByWithRelationInput[]
    cursor?: StaffAttendanceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StaffAttendanceScalarFieldEnum | StaffAttendanceScalarFieldEnum[]
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
   * Model StaffAttendance
   */

  export type AggregateStaffAttendance = {
    _count: StaffAttendanceCountAggregateOutputType | null
    _avg: StaffAttendanceAvgAggregateOutputType | null
    _sum: StaffAttendanceSumAggregateOutputType | null
    _min: StaffAttendanceMinAggregateOutputType | null
    _max: StaffAttendanceMaxAggregateOutputType | null
  }

  export type StaffAttendanceAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type StaffAttendanceSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type StaffAttendanceMinAggregateOutputType = {
    id: number | null
    userId: number | null
    attendanceDate: string | null
    status: string | null
    checkIn: string | null
    checkOut: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StaffAttendanceMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    attendanceDate: string | null
    status: string | null
    checkIn: string | null
    checkOut: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StaffAttendanceCountAggregateOutputType = {
    id: number
    userId: number
    attendanceDate: number
    status: number
    checkIn: number
    checkOut: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StaffAttendanceAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type StaffAttendanceSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type StaffAttendanceMinAggregateInputType = {
    id?: true
    userId?: true
    attendanceDate?: true
    status?: true
    checkIn?: true
    checkOut?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StaffAttendanceMaxAggregateInputType = {
    id?: true
    userId?: true
    attendanceDate?: true
    status?: true
    checkIn?: true
    checkOut?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StaffAttendanceCountAggregateInputType = {
    id?: true
    userId?: true
    attendanceDate?: true
    status?: true
    checkIn?: true
    checkOut?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StaffAttendanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StaffAttendance to aggregate.
     */
    where?: StaffAttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffAttendances to fetch.
     */
    orderBy?: StaffAttendanceOrderByWithRelationInput | StaffAttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StaffAttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffAttendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffAttendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StaffAttendances
    **/
    _count?: true | StaffAttendanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StaffAttendanceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StaffAttendanceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StaffAttendanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StaffAttendanceMaxAggregateInputType
  }

  export type GetStaffAttendanceAggregateType<T extends StaffAttendanceAggregateArgs> = {
        [P in keyof T & keyof AggregateStaffAttendance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStaffAttendance[P]>
      : GetScalarType<T[P], AggregateStaffAttendance[P]>
  }




  export type StaffAttendanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StaffAttendanceWhereInput
    orderBy?: StaffAttendanceOrderByWithAggregationInput | StaffAttendanceOrderByWithAggregationInput[]
    by: StaffAttendanceScalarFieldEnum[] | StaffAttendanceScalarFieldEnum
    having?: StaffAttendanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StaffAttendanceCountAggregateInputType | true
    _avg?: StaffAttendanceAvgAggregateInputType
    _sum?: StaffAttendanceSumAggregateInputType
    _min?: StaffAttendanceMinAggregateInputType
    _max?: StaffAttendanceMaxAggregateInputType
  }

  export type StaffAttendanceGroupByOutputType = {
    id: number
    userId: number
    attendanceDate: string
    status: string
    checkIn: string | null
    checkOut: string | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: StaffAttendanceCountAggregateOutputType | null
    _avg: StaffAttendanceAvgAggregateOutputType | null
    _sum: StaffAttendanceSumAggregateOutputType | null
    _min: StaffAttendanceMinAggregateOutputType | null
    _max: StaffAttendanceMaxAggregateOutputType | null
  }

  type GetStaffAttendanceGroupByPayload<T extends StaffAttendanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StaffAttendanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StaffAttendanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StaffAttendanceGroupByOutputType[P]>
            : GetScalarType<T[P], StaffAttendanceGroupByOutputType[P]>
        }
      >
    >


  export type StaffAttendanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    attendanceDate?: boolean
    status?: boolean
    checkIn?: boolean
    checkOut?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["staffAttendance"]>

  export type StaffAttendanceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    attendanceDate?: boolean
    status?: boolean
    checkIn?: boolean
    checkOut?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["staffAttendance"]>

  export type StaffAttendanceSelectScalar = {
    id?: boolean
    userId?: boolean
    attendanceDate?: boolean
    status?: boolean
    checkIn?: boolean
    checkOut?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StaffAttendanceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type StaffAttendanceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $StaffAttendancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StaffAttendance"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      attendanceDate: string
      status: string
      checkIn: string | null
      checkOut: string | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["staffAttendance"]>
    composites: {}
  }

  type StaffAttendanceGetPayload<S extends boolean | null | undefined | StaffAttendanceDefaultArgs> = $Result.GetResult<Prisma.$StaffAttendancePayload, S>

  type StaffAttendanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StaffAttendanceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StaffAttendanceCountAggregateInputType | true
    }

  export interface StaffAttendanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StaffAttendance'], meta: { name: 'StaffAttendance' } }
    /**
     * Find zero or one StaffAttendance that matches the filter.
     * @param {StaffAttendanceFindUniqueArgs} args - Arguments to find a StaffAttendance
     * @example
     * // Get one StaffAttendance
     * const staffAttendance = await prisma.staffAttendance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StaffAttendanceFindUniqueArgs>(args: SelectSubset<T, StaffAttendanceFindUniqueArgs<ExtArgs>>): Prisma__StaffAttendanceClient<$Result.GetResult<Prisma.$StaffAttendancePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one StaffAttendance that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StaffAttendanceFindUniqueOrThrowArgs} args - Arguments to find a StaffAttendance
     * @example
     * // Get one StaffAttendance
     * const staffAttendance = await prisma.staffAttendance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StaffAttendanceFindUniqueOrThrowArgs>(args: SelectSubset<T, StaffAttendanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StaffAttendanceClient<$Result.GetResult<Prisma.$StaffAttendancePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first StaffAttendance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffAttendanceFindFirstArgs} args - Arguments to find a StaffAttendance
     * @example
     * // Get one StaffAttendance
     * const staffAttendance = await prisma.staffAttendance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StaffAttendanceFindFirstArgs>(args?: SelectSubset<T, StaffAttendanceFindFirstArgs<ExtArgs>>): Prisma__StaffAttendanceClient<$Result.GetResult<Prisma.$StaffAttendancePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first StaffAttendance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffAttendanceFindFirstOrThrowArgs} args - Arguments to find a StaffAttendance
     * @example
     * // Get one StaffAttendance
     * const staffAttendance = await prisma.staffAttendance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StaffAttendanceFindFirstOrThrowArgs>(args?: SelectSubset<T, StaffAttendanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__StaffAttendanceClient<$Result.GetResult<Prisma.$StaffAttendancePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more StaffAttendances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffAttendanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StaffAttendances
     * const staffAttendances = await prisma.staffAttendance.findMany()
     * 
     * // Get first 10 StaffAttendances
     * const staffAttendances = await prisma.staffAttendance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const staffAttendanceWithIdOnly = await prisma.staffAttendance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StaffAttendanceFindManyArgs>(args?: SelectSubset<T, StaffAttendanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffAttendancePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a StaffAttendance.
     * @param {StaffAttendanceCreateArgs} args - Arguments to create a StaffAttendance.
     * @example
     * // Create one StaffAttendance
     * const StaffAttendance = await prisma.staffAttendance.create({
     *   data: {
     *     // ... data to create a StaffAttendance
     *   }
     * })
     * 
     */
    create<T extends StaffAttendanceCreateArgs>(args: SelectSubset<T, StaffAttendanceCreateArgs<ExtArgs>>): Prisma__StaffAttendanceClient<$Result.GetResult<Prisma.$StaffAttendancePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many StaffAttendances.
     * @param {StaffAttendanceCreateManyArgs} args - Arguments to create many StaffAttendances.
     * @example
     * // Create many StaffAttendances
     * const staffAttendance = await prisma.staffAttendance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StaffAttendanceCreateManyArgs>(args?: SelectSubset<T, StaffAttendanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StaffAttendances and returns the data saved in the database.
     * @param {StaffAttendanceCreateManyAndReturnArgs} args - Arguments to create many StaffAttendances.
     * @example
     * // Create many StaffAttendances
     * const staffAttendance = await prisma.staffAttendance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StaffAttendances and only return the `id`
     * const staffAttendanceWithIdOnly = await prisma.staffAttendance.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StaffAttendanceCreateManyAndReturnArgs>(args?: SelectSubset<T, StaffAttendanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffAttendancePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a StaffAttendance.
     * @param {StaffAttendanceDeleteArgs} args - Arguments to delete one StaffAttendance.
     * @example
     * // Delete one StaffAttendance
     * const StaffAttendance = await prisma.staffAttendance.delete({
     *   where: {
     *     // ... filter to delete one StaffAttendance
     *   }
     * })
     * 
     */
    delete<T extends StaffAttendanceDeleteArgs>(args: SelectSubset<T, StaffAttendanceDeleteArgs<ExtArgs>>): Prisma__StaffAttendanceClient<$Result.GetResult<Prisma.$StaffAttendancePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one StaffAttendance.
     * @param {StaffAttendanceUpdateArgs} args - Arguments to update one StaffAttendance.
     * @example
     * // Update one StaffAttendance
     * const staffAttendance = await prisma.staffAttendance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StaffAttendanceUpdateArgs>(args: SelectSubset<T, StaffAttendanceUpdateArgs<ExtArgs>>): Prisma__StaffAttendanceClient<$Result.GetResult<Prisma.$StaffAttendancePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more StaffAttendances.
     * @param {StaffAttendanceDeleteManyArgs} args - Arguments to filter StaffAttendances to delete.
     * @example
     * // Delete a few StaffAttendances
     * const { count } = await prisma.staffAttendance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StaffAttendanceDeleteManyArgs>(args?: SelectSubset<T, StaffAttendanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StaffAttendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffAttendanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StaffAttendances
     * const staffAttendance = await prisma.staffAttendance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StaffAttendanceUpdateManyArgs>(args: SelectSubset<T, StaffAttendanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one StaffAttendance.
     * @param {StaffAttendanceUpsertArgs} args - Arguments to update or create a StaffAttendance.
     * @example
     * // Update or create a StaffAttendance
     * const staffAttendance = await prisma.staffAttendance.upsert({
     *   create: {
     *     // ... data to create a StaffAttendance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StaffAttendance we want to update
     *   }
     * })
     */
    upsert<T extends StaffAttendanceUpsertArgs>(args: SelectSubset<T, StaffAttendanceUpsertArgs<ExtArgs>>): Prisma__StaffAttendanceClient<$Result.GetResult<Prisma.$StaffAttendancePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of StaffAttendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffAttendanceCountArgs} args - Arguments to filter StaffAttendances to count.
     * @example
     * // Count the number of StaffAttendances
     * const count = await prisma.staffAttendance.count({
     *   where: {
     *     // ... the filter for the StaffAttendances we want to count
     *   }
     * })
    **/
    count<T extends StaffAttendanceCountArgs>(
      args?: Subset<T, StaffAttendanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StaffAttendanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StaffAttendance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffAttendanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StaffAttendanceAggregateArgs>(args: Subset<T, StaffAttendanceAggregateArgs>): Prisma.PrismaPromise<GetStaffAttendanceAggregateType<T>>

    /**
     * Group by StaffAttendance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffAttendanceGroupByArgs} args - Group by arguments.
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
      T extends StaffAttendanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StaffAttendanceGroupByArgs['orderBy'] }
        : { orderBy?: StaffAttendanceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StaffAttendanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStaffAttendanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StaffAttendance model
   */
  readonly fields: StaffAttendanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StaffAttendance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StaffAttendanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the StaffAttendance model
   */ 
  interface StaffAttendanceFieldRefs {
    readonly id: FieldRef<"StaffAttendance", 'Int'>
    readonly userId: FieldRef<"StaffAttendance", 'Int'>
    readonly attendanceDate: FieldRef<"StaffAttendance", 'String'>
    readonly status: FieldRef<"StaffAttendance", 'String'>
    readonly checkIn: FieldRef<"StaffAttendance", 'String'>
    readonly checkOut: FieldRef<"StaffAttendance", 'String'>
    readonly notes: FieldRef<"StaffAttendance", 'String'>
    readonly createdAt: FieldRef<"StaffAttendance", 'DateTime'>
    readonly updatedAt: FieldRef<"StaffAttendance", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StaffAttendance findUnique
   */
  export type StaffAttendanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffAttendance
     */
    select?: StaffAttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffAttendanceInclude<ExtArgs> | null
    /**
     * Filter, which StaffAttendance to fetch.
     */
    where: StaffAttendanceWhereUniqueInput
  }

  /**
   * StaffAttendance findUniqueOrThrow
   */
  export type StaffAttendanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffAttendance
     */
    select?: StaffAttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffAttendanceInclude<ExtArgs> | null
    /**
     * Filter, which StaffAttendance to fetch.
     */
    where: StaffAttendanceWhereUniqueInput
  }

  /**
   * StaffAttendance findFirst
   */
  export type StaffAttendanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffAttendance
     */
    select?: StaffAttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffAttendanceInclude<ExtArgs> | null
    /**
     * Filter, which StaffAttendance to fetch.
     */
    where?: StaffAttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffAttendances to fetch.
     */
    orderBy?: StaffAttendanceOrderByWithRelationInput | StaffAttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StaffAttendances.
     */
    cursor?: StaffAttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffAttendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffAttendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StaffAttendances.
     */
    distinct?: StaffAttendanceScalarFieldEnum | StaffAttendanceScalarFieldEnum[]
  }

  /**
   * StaffAttendance findFirstOrThrow
   */
  export type StaffAttendanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffAttendance
     */
    select?: StaffAttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffAttendanceInclude<ExtArgs> | null
    /**
     * Filter, which StaffAttendance to fetch.
     */
    where?: StaffAttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffAttendances to fetch.
     */
    orderBy?: StaffAttendanceOrderByWithRelationInput | StaffAttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StaffAttendances.
     */
    cursor?: StaffAttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffAttendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffAttendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StaffAttendances.
     */
    distinct?: StaffAttendanceScalarFieldEnum | StaffAttendanceScalarFieldEnum[]
  }

  /**
   * StaffAttendance findMany
   */
  export type StaffAttendanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffAttendance
     */
    select?: StaffAttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffAttendanceInclude<ExtArgs> | null
    /**
     * Filter, which StaffAttendances to fetch.
     */
    where?: StaffAttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffAttendances to fetch.
     */
    orderBy?: StaffAttendanceOrderByWithRelationInput | StaffAttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StaffAttendances.
     */
    cursor?: StaffAttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffAttendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffAttendances.
     */
    skip?: number
    distinct?: StaffAttendanceScalarFieldEnum | StaffAttendanceScalarFieldEnum[]
  }

  /**
   * StaffAttendance create
   */
  export type StaffAttendanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffAttendance
     */
    select?: StaffAttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffAttendanceInclude<ExtArgs> | null
    /**
     * The data needed to create a StaffAttendance.
     */
    data: XOR<StaffAttendanceCreateInput, StaffAttendanceUncheckedCreateInput>
  }

  /**
   * StaffAttendance createMany
   */
  export type StaffAttendanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StaffAttendances.
     */
    data: StaffAttendanceCreateManyInput | StaffAttendanceCreateManyInput[]
  }

  /**
   * StaffAttendance createManyAndReturn
   */
  export type StaffAttendanceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffAttendance
     */
    select?: StaffAttendanceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many StaffAttendances.
     */
    data: StaffAttendanceCreateManyInput | StaffAttendanceCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffAttendanceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StaffAttendance update
   */
  export type StaffAttendanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffAttendance
     */
    select?: StaffAttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffAttendanceInclude<ExtArgs> | null
    /**
     * The data needed to update a StaffAttendance.
     */
    data: XOR<StaffAttendanceUpdateInput, StaffAttendanceUncheckedUpdateInput>
    /**
     * Choose, which StaffAttendance to update.
     */
    where: StaffAttendanceWhereUniqueInput
  }

  /**
   * StaffAttendance updateMany
   */
  export type StaffAttendanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StaffAttendances.
     */
    data: XOR<StaffAttendanceUpdateManyMutationInput, StaffAttendanceUncheckedUpdateManyInput>
    /**
     * Filter which StaffAttendances to update
     */
    where?: StaffAttendanceWhereInput
  }

  /**
   * StaffAttendance upsert
   */
  export type StaffAttendanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffAttendance
     */
    select?: StaffAttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffAttendanceInclude<ExtArgs> | null
    /**
     * The filter to search for the StaffAttendance to update in case it exists.
     */
    where: StaffAttendanceWhereUniqueInput
    /**
     * In case the StaffAttendance found by the `where` argument doesn't exist, create a new StaffAttendance with this data.
     */
    create: XOR<StaffAttendanceCreateInput, StaffAttendanceUncheckedCreateInput>
    /**
     * In case the StaffAttendance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StaffAttendanceUpdateInput, StaffAttendanceUncheckedUpdateInput>
  }

  /**
   * StaffAttendance delete
   */
  export type StaffAttendanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffAttendance
     */
    select?: StaffAttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffAttendanceInclude<ExtArgs> | null
    /**
     * Filter which StaffAttendance to delete.
     */
    where: StaffAttendanceWhereUniqueInput
  }

  /**
   * StaffAttendance deleteMany
   */
  export type StaffAttendanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StaffAttendances to delete
     */
    where?: StaffAttendanceWhereInput
  }

  /**
   * StaffAttendance without action
   */
  export type StaffAttendanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffAttendance
     */
    select?: StaffAttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffAttendanceInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryAvgAggregateOutputType = {
    id: number | null
  }

  export type CategorySumAggregateOutputType = {
    id: number | null
  }

  export type CategoryMinAggregateOutputType = {
    id: number | null
    name: string | null
    isDeleted: boolean | null
    createdAt: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: number | null
    name: string | null
    isDeleted: boolean | null
    createdAt: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    isDeleted: number
    createdAt: number
    _all: number
  }


  export type CategoryAvgAggregateInputType = {
    id?: true
  }

  export type CategorySumAggregateInputType = {
    id?: true
  }

  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    isDeleted?: true
    createdAt?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    isDeleted?: true
    createdAt?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    isDeleted?: true
    createdAt?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _avg?: CategoryAvgAggregateInputType
    _sum?: CategorySumAggregateInputType
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: number
    name: string
    isDeleted: boolean
    createdAt: Date
    _count: CategoryCountAggregateOutputType | null
    _avg: CategoryAvgAggregateOutputType | null
    _sum: CategorySumAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    isDeleted?: boolean
    createdAt?: boolean
    menuItems?: boolean | Category$menuItemsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    isDeleted?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
    isDeleted?: boolean
    createdAt?: boolean
  }

  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    menuItems?: boolean | Category$menuItemsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      menuItems: Prisma.$MenuItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      isDeleted: boolean
      createdAt: Date
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
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
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    menuItems<T extends Category$menuItemsArgs<ExtArgs> = {}>(args?: Subset<T, Category$menuItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Category model
   */ 
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'Int'>
    readonly name: FieldRef<"Category", 'String'>
    readonly isDeleted: FieldRef<"Category", 'Boolean'>
    readonly createdAt: FieldRef<"Category", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
  }

  /**
   * Category.menuItems
   */
  export type Category$menuItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    where?: MenuItemWhereInput
    orderBy?: MenuItemOrderByWithRelationInput | MenuItemOrderByWithRelationInput[]
    cursor?: MenuItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MenuItemScalarFieldEnum | MenuItemScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model MenuItem
   */

  export type AggregateMenuItem = {
    _count: MenuItemCountAggregateOutputType | null
    _avg: MenuItemAvgAggregateOutputType | null
    _sum: MenuItemSumAggregateOutputType | null
    _min: MenuItemMinAggregateOutputType | null
    _max: MenuItemMaxAggregateOutputType | null
  }

  export type MenuItemAvgAggregateOutputType = {
    id: number | null
    price: Decimal | null
    categoryId: number | null
  }

  export type MenuItemSumAggregateOutputType = {
    id: number | null
    price: Decimal | null
    categoryId: number | null
  }

  export type MenuItemMinAggregateOutputType = {
    id: number | null
    name: string | null
    price: Decimal | null
    categoryId: number | null
    isAvailable: boolean | null
    imageUrl: string | null
    isDeleted: boolean | null
    createdAt: Date | null
  }

  export type MenuItemMaxAggregateOutputType = {
    id: number | null
    name: string | null
    price: Decimal | null
    categoryId: number | null
    isAvailable: boolean | null
    imageUrl: string | null
    isDeleted: boolean | null
    createdAt: Date | null
  }

  export type MenuItemCountAggregateOutputType = {
    id: number
    name: number
    price: number
    categoryId: number
    isAvailable: number
    imageUrl: number
    isDeleted: number
    createdAt: number
    _all: number
  }


  export type MenuItemAvgAggregateInputType = {
    id?: true
    price?: true
    categoryId?: true
  }

  export type MenuItemSumAggregateInputType = {
    id?: true
    price?: true
    categoryId?: true
  }

  export type MenuItemMinAggregateInputType = {
    id?: true
    name?: true
    price?: true
    categoryId?: true
    isAvailable?: true
    imageUrl?: true
    isDeleted?: true
    createdAt?: true
  }

  export type MenuItemMaxAggregateInputType = {
    id?: true
    name?: true
    price?: true
    categoryId?: true
    isAvailable?: true
    imageUrl?: true
    isDeleted?: true
    createdAt?: true
  }

  export type MenuItemCountAggregateInputType = {
    id?: true
    name?: true
    price?: true
    categoryId?: true
    isAvailable?: true
    imageUrl?: true
    isDeleted?: true
    createdAt?: true
    _all?: true
  }

  export type MenuItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MenuItem to aggregate.
     */
    where?: MenuItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenuItems to fetch.
     */
    orderBy?: MenuItemOrderByWithRelationInput | MenuItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MenuItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenuItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenuItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MenuItems
    **/
    _count?: true | MenuItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MenuItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MenuItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MenuItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MenuItemMaxAggregateInputType
  }

  export type GetMenuItemAggregateType<T extends MenuItemAggregateArgs> = {
        [P in keyof T & keyof AggregateMenuItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMenuItem[P]>
      : GetScalarType<T[P], AggregateMenuItem[P]>
  }




  export type MenuItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MenuItemWhereInput
    orderBy?: MenuItemOrderByWithAggregationInput | MenuItemOrderByWithAggregationInput[]
    by: MenuItemScalarFieldEnum[] | MenuItemScalarFieldEnum
    having?: MenuItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MenuItemCountAggregateInputType | true
    _avg?: MenuItemAvgAggregateInputType
    _sum?: MenuItemSumAggregateInputType
    _min?: MenuItemMinAggregateInputType
    _max?: MenuItemMaxAggregateInputType
  }

  export type MenuItemGroupByOutputType = {
    id: number
    name: string
    price: Decimal
    categoryId: number
    isAvailable: boolean
    imageUrl: string | null
    isDeleted: boolean
    createdAt: Date
    _count: MenuItemCountAggregateOutputType | null
    _avg: MenuItemAvgAggregateOutputType | null
    _sum: MenuItemSumAggregateOutputType | null
    _min: MenuItemMinAggregateOutputType | null
    _max: MenuItemMaxAggregateOutputType | null
  }

  type GetMenuItemGroupByPayload<T extends MenuItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MenuItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MenuItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MenuItemGroupByOutputType[P]>
            : GetScalarType<T[P], MenuItemGroupByOutputType[P]>
        }
      >
    >


  export type MenuItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    categoryId?: boolean
    isAvailable?: boolean
    imageUrl?: boolean
    isDeleted?: boolean
    createdAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    orderItems?: boolean | MenuItem$orderItemsArgs<ExtArgs>
    _count?: boolean | MenuItemCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["menuItem"]>

  export type MenuItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    price?: boolean
    categoryId?: boolean
    isAvailable?: boolean
    imageUrl?: boolean
    isDeleted?: boolean
    createdAt?: boolean
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["menuItem"]>

  export type MenuItemSelectScalar = {
    id?: boolean
    name?: boolean
    price?: boolean
    categoryId?: boolean
    isAvailable?: boolean
    imageUrl?: boolean
    isDeleted?: boolean
    createdAt?: boolean
  }

  export type MenuItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
    orderItems?: boolean | MenuItem$orderItemsArgs<ExtArgs>
    _count?: boolean | MenuItemCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MenuItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }

  export type $MenuItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MenuItem"
    objects: {
      category: Prisma.$CategoryPayload<ExtArgs>
      orderItems: Prisma.$OrderItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      price: Prisma.Decimal
      categoryId: number
      isAvailable: boolean
      imageUrl: string | null
      isDeleted: boolean
      createdAt: Date
    }, ExtArgs["result"]["menuItem"]>
    composites: {}
  }

  type MenuItemGetPayload<S extends boolean | null | undefined | MenuItemDefaultArgs> = $Result.GetResult<Prisma.$MenuItemPayload, S>

  type MenuItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MenuItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MenuItemCountAggregateInputType | true
    }

  export interface MenuItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MenuItem'], meta: { name: 'MenuItem' } }
    /**
     * Find zero or one MenuItem that matches the filter.
     * @param {MenuItemFindUniqueArgs} args - Arguments to find a MenuItem
     * @example
     * // Get one MenuItem
     * const menuItem = await prisma.menuItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MenuItemFindUniqueArgs>(args: SelectSubset<T, MenuItemFindUniqueArgs<ExtArgs>>): Prisma__MenuItemClient<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MenuItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MenuItemFindUniqueOrThrowArgs} args - Arguments to find a MenuItem
     * @example
     * // Get one MenuItem
     * const menuItem = await prisma.menuItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MenuItemFindUniqueOrThrowArgs>(args: SelectSubset<T, MenuItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MenuItemClient<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MenuItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemFindFirstArgs} args - Arguments to find a MenuItem
     * @example
     * // Get one MenuItem
     * const menuItem = await prisma.menuItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MenuItemFindFirstArgs>(args?: SelectSubset<T, MenuItemFindFirstArgs<ExtArgs>>): Prisma__MenuItemClient<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MenuItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemFindFirstOrThrowArgs} args - Arguments to find a MenuItem
     * @example
     * // Get one MenuItem
     * const menuItem = await prisma.menuItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MenuItemFindFirstOrThrowArgs>(args?: SelectSubset<T, MenuItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__MenuItemClient<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MenuItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MenuItems
     * const menuItems = await prisma.menuItem.findMany()
     * 
     * // Get first 10 MenuItems
     * const menuItems = await prisma.menuItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const menuItemWithIdOnly = await prisma.menuItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MenuItemFindManyArgs>(args?: SelectSubset<T, MenuItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MenuItem.
     * @param {MenuItemCreateArgs} args - Arguments to create a MenuItem.
     * @example
     * // Create one MenuItem
     * const MenuItem = await prisma.menuItem.create({
     *   data: {
     *     // ... data to create a MenuItem
     *   }
     * })
     * 
     */
    create<T extends MenuItemCreateArgs>(args: SelectSubset<T, MenuItemCreateArgs<ExtArgs>>): Prisma__MenuItemClient<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MenuItems.
     * @param {MenuItemCreateManyArgs} args - Arguments to create many MenuItems.
     * @example
     * // Create many MenuItems
     * const menuItem = await prisma.menuItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MenuItemCreateManyArgs>(args?: SelectSubset<T, MenuItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MenuItems and returns the data saved in the database.
     * @param {MenuItemCreateManyAndReturnArgs} args - Arguments to create many MenuItems.
     * @example
     * // Create many MenuItems
     * const menuItem = await prisma.menuItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MenuItems and only return the `id`
     * const menuItemWithIdOnly = await prisma.menuItem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MenuItemCreateManyAndReturnArgs>(args?: SelectSubset<T, MenuItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MenuItem.
     * @param {MenuItemDeleteArgs} args - Arguments to delete one MenuItem.
     * @example
     * // Delete one MenuItem
     * const MenuItem = await prisma.menuItem.delete({
     *   where: {
     *     // ... filter to delete one MenuItem
     *   }
     * })
     * 
     */
    delete<T extends MenuItemDeleteArgs>(args: SelectSubset<T, MenuItemDeleteArgs<ExtArgs>>): Prisma__MenuItemClient<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MenuItem.
     * @param {MenuItemUpdateArgs} args - Arguments to update one MenuItem.
     * @example
     * // Update one MenuItem
     * const menuItem = await prisma.menuItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MenuItemUpdateArgs>(args: SelectSubset<T, MenuItemUpdateArgs<ExtArgs>>): Prisma__MenuItemClient<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MenuItems.
     * @param {MenuItemDeleteManyArgs} args - Arguments to filter MenuItems to delete.
     * @example
     * // Delete a few MenuItems
     * const { count } = await prisma.menuItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MenuItemDeleteManyArgs>(args?: SelectSubset<T, MenuItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MenuItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MenuItems
     * const menuItem = await prisma.menuItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MenuItemUpdateManyArgs>(args: SelectSubset<T, MenuItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MenuItem.
     * @param {MenuItemUpsertArgs} args - Arguments to update or create a MenuItem.
     * @example
     * // Update or create a MenuItem
     * const menuItem = await prisma.menuItem.upsert({
     *   create: {
     *     // ... data to create a MenuItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MenuItem we want to update
     *   }
     * })
     */
    upsert<T extends MenuItemUpsertArgs>(args: SelectSubset<T, MenuItemUpsertArgs<ExtArgs>>): Prisma__MenuItemClient<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MenuItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemCountArgs} args - Arguments to filter MenuItems to count.
     * @example
     * // Count the number of MenuItems
     * const count = await prisma.menuItem.count({
     *   where: {
     *     // ... the filter for the MenuItems we want to count
     *   }
     * })
    **/
    count<T extends MenuItemCountArgs>(
      args?: Subset<T, MenuItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MenuItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MenuItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MenuItemAggregateArgs>(args: Subset<T, MenuItemAggregateArgs>): Prisma.PrismaPromise<GetMenuItemAggregateType<T>>

    /**
     * Group by MenuItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuItemGroupByArgs} args - Group by arguments.
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
      T extends MenuItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MenuItemGroupByArgs['orderBy'] }
        : { orderBy?: MenuItemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MenuItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMenuItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MenuItem model
   */
  readonly fields: MenuItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MenuItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MenuItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    orderItems<T extends MenuItem$orderItemsArgs<ExtArgs> = {}>(args?: Subset<T, MenuItem$orderItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the MenuItem model
   */ 
  interface MenuItemFieldRefs {
    readonly id: FieldRef<"MenuItem", 'Int'>
    readonly name: FieldRef<"MenuItem", 'String'>
    readonly price: FieldRef<"MenuItem", 'Decimal'>
    readonly categoryId: FieldRef<"MenuItem", 'Int'>
    readonly isAvailable: FieldRef<"MenuItem", 'Boolean'>
    readonly imageUrl: FieldRef<"MenuItem", 'String'>
    readonly isDeleted: FieldRef<"MenuItem", 'Boolean'>
    readonly createdAt: FieldRef<"MenuItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MenuItem findUnique
   */
  export type MenuItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * Filter, which MenuItem to fetch.
     */
    where: MenuItemWhereUniqueInput
  }

  /**
   * MenuItem findUniqueOrThrow
   */
  export type MenuItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * Filter, which MenuItem to fetch.
     */
    where: MenuItemWhereUniqueInput
  }

  /**
   * MenuItem findFirst
   */
  export type MenuItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * Filter, which MenuItem to fetch.
     */
    where?: MenuItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenuItems to fetch.
     */
    orderBy?: MenuItemOrderByWithRelationInput | MenuItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MenuItems.
     */
    cursor?: MenuItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenuItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenuItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MenuItems.
     */
    distinct?: MenuItemScalarFieldEnum | MenuItemScalarFieldEnum[]
  }

  /**
   * MenuItem findFirstOrThrow
   */
  export type MenuItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * Filter, which MenuItem to fetch.
     */
    where?: MenuItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenuItems to fetch.
     */
    orderBy?: MenuItemOrderByWithRelationInput | MenuItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MenuItems.
     */
    cursor?: MenuItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenuItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenuItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MenuItems.
     */
    distinct?: MenuItemScalarFieldEnum | MenuItemScalarFieldEnum[]
  }

  /**
   * MenuItem findMany
   */
  export type MenuItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * Filter, which MenuItems to fetch.
     */
    where?: MenuItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenuItems to fetch.
     */
    orderBy?: MenuItemOrderByWithRelationInput | MenuItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MenuItems.
     */
    cursor?: MenuItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenuItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenuItems.
     */
    skip?: number
    distinct?: MenuItemScalarFieldEnum | MenuItemScalarFieldEnum[]
  }

  /**
   * MenuItem create
   */
  export type MenuItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * The data needed to create a MenuItem.
     */
    data: XOR<MenuItemCreateInput, MenuItemUncheckedCreateInput>
  }

  /**
   * MenuItem createMany
   */
  export type MenuItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MenuItems.
     */
    data: MenuItemCreateManyInput | MenuItemCreateManyInput[]
  }

  /**
   * MenuItem createManyAndReturn
   */
  export type MenuItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MenuItems.
     */
    data: MenuItemCreateManyInput | MenuItemCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MenuItem update
   */
  export type MenuItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * The data needed to update a MenuItem.
     */
    data: XOR<MenuItemUpdateInput, MenuItemUncheckedUpdateInput>
    /**
     * Choose, which MenuItem to update.
     */
    where: MenuItemWhereUniqueInput
  }

  /**
   * MenuItem updateMany
   */
  export type MenuItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MenuItems.
     */
    data: XOR<MenuItemUpdateManyMutationInput, MenuItemUncheckedUpdateManyInput>
    /**
     * Filter which MenuItems to update
     */
    where?: MenuItemWhereInput
  }

  /**
   * MenuItem upsert
   */
  export type MenuItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * The filter to search for the MenuItem to update in case it exists.
     */
    where: MenuItemWhereUniqueInput
    /**
     * In case the MenuItem found by the `where` argument doesn't exist, create a new MenuItem with this data.
     */
    create: XOR<MenuItemCreateInput, MenuItemUncheckedCreateInput>
    /**
     * In case the MenuItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MenuItemUpdateInput, MenuItemUncheckedUpdateInput>
  }

  /**
   * MenuItem delete
   */
  export type MenuItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
    /**
     * Filter which MenuItem to delete.
     */
    where: MenuItemWhereUniqueInput
  }

  /**
   * MenuItem deleteMany
   */
  export type MenuItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MenuItems to delete
     */
    where?: MenuItemWhereInput
  }

  /**
   * MenuItem.orderItems
   */
  export type MenuItem$orderItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * MenuItem without action
   */
  export type MenuItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: MenuItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenuItemInclude<ExtArgs> | null
  }


  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderAvgAggregateOutputType = {
    id: number | null
    tableId: number | null
    subtotal: Decimal | null
    discountAmount: Decimal | null
    taxAmount: Decimal | null
    finalAmount: Decimal | null
  }

  export type OrderSumAggregateOutputType = {
    id: number | null
    tableId: number | null
    subtotal: Decimal | null
    discountAmount: Decimal | null
    taxAmount: Decimal | null
    finalAmount: Decimal | null
  }

  export type OrderMinAggregateOutputType = {
    id: number | null
    billNumber: string | null
    status: string | null
    paymentStatus: string | null
    customerName: string | null
    customerPhone: string | null
    tableId: number | null
    orderType: string | null
    subtotal: Decimal | null
    discountAmount: Decimal | null
    taxAmount: Decimal | null
    finalAmount: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderMaxAggregateOutputType = {
    id: number | null
    billNumber: string | null
    status: string | null
    paymentStatus: string | null
    customerName: string | null
    customerPhone: string | null
    tableId: number | null
    orderType: string | null
    subtotal: Decimal | null
    discountAmount: Decimal | null
    taxAmount: Decimal | null
    finalAmount: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    billNumber: number
    status: number
    paymentStatus: number
    customerName: number
    customerPhone: number
    tableId: number
    orderType: number
    subtotal: number
    discountAmount: number
    taxAmount: number
    finalAmount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    id?: true
    tableId?: true
    subtotal?: true
    discountAmount?: true
    taxAmount?: true
    finalAmount?: true
  }

  export type OrderSumAggregateInputType = {
    id?: true
    tableId?: true
    subtotal?: true
    discountAmount?: true
    taxAmount?: true
    finalAmount?: true
  }

  export type OrderMinAggregateInputType = {
    id?: true
    billNumber?: true
    status?: true
    paymentStatus?: true
    customerName?: true
    customerPhone?: true
    tableId?: true
    orderType?: true
    subtotal?: true
    discountAmount?: true
    taxAmount?: true
    finalAmount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    billNumber?: true
    status?: true
    paymentStatus?: true
    customerName?: true
    customerPhone?: true
    tableId?: true
    orderType?: true
    subtotal?: true
    discountAmount?: true
    taxAmount?: true
    finalAmount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    billNumber?: true
    status?: true
    paymentStatus?: true
    customerName?: true
    customerPhone?: true
    tableId?: true
    orderType?: true
    subtotal?: true
    discountAmount?: true
    taxAmount?: true
    finalAmount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _avg?: OrderAvgAggregateInputType
    _sum?: OrderSumAggregateInputType
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: number
    billNumber: string
    status: string
    paymentStatus: string
    customerName: string | null
    customerPhone: string | null
    tableId: number | null
    orderType: string
    subtotal: Decimal
    discountAmount: Decimal
    taxAmount: Decimal
    finalAmount: Decimal
    createdAt: Date
    updatedAt: Date
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    billNumber?: boolean
    status?: boolean
    paymentStatus?: boolean
    customerName?: boolean
    customerPhone?: boolean
    tableId?: boolean
    orderType?: boolean
    subtotal?: boolean
    discountAmount?: boolean
    taxAmount?: boolean
    finalAmount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    items?: boolean | Order$itemsArgs<ExtArgs>
    payments?: boolean | Order$paymentsArgs<ExtArgs>
    kotTickets?: boolean | Order$kotTicketsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>

  export type OrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    billNumber?: boolean
    status?: boolean
    paymentStatus?: boolean
    customerName?: boolean
    customerPhone?: boolean
    tableId?: boolean
    orderType?: boolean
    subtotal?: boolean
    discountAmount?: boolean
    taxAmount?: boolean
    finalAmount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["order"]>

  export type OrderSelectScalar = {
    id?: boolean
    billNumber?: boolean
    status?: boolean
    paymentStatus?: boolean
    customerName?: boolean
    customerPhone?: boolean
    tableId?: boolean
    orderType?: boolean
    subtotal?: boolean
    discountAmount?: boolean
    taxAmount?: boolean
    finalAmount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | Order$itemsArgs<ExtArgs>
    payments?: boolean | Order$paymentsArgs<ExtArgs>
    kotTickets?: boolean | Order$kotTicketsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      items: Prisma.$OrderItemPayload<ExtArgs>[]
      payments: Prisma.$PaymentPayload<ExtArgs>[]
      kotTickets: Prisma.$KotTicketPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      billNumber: string
      status: string
      paymentStatus: string
      customerName: string | null
      customerPhone: string | null
      tableId: number | null
      orderType: string
      subtotal: Prisma.Decimal
      discountAmount: Prisma.Decimal
      taxAmount: Prisma.Decimal
      finalAmount: Prisma.Decimal
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["order"]>
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Orders and returns the data saved in the database.
     * @param {OrderCreateManyAndReturnArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Orders and only return the `id`
     * const orderWithIdOnly = await prisma.order.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
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
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    items<T extends Order$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Order$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany"> | Null>
    payments<T extends Order$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Order$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany"> | Null>
    kotTickets<T extends Order$kotTicketsArgs<ExtArgs> = {}>(args?: Subset<T, Order$kotTicketsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KotTicketPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Order model
   */ 
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'Int'>
    readonly billNumber: FieldRef<"Order", 'String'>
    readonly status: FieldRef<"Order", 'String'>
    readonly paymentStatus: FieldRef<"Order", 'String'>
    readonly customerName: FieldRef<"Order", 'String'>
    readonly customerPhone: FieldRef<"Order", 'String'>
    readonly tableId: FieldRef<"Order", 'Int'>
    readonly orderType: FieldRef<"Order", 'String'>
    readonly subtotal: FieldRef<"Order", 'Decimal'>
    readonly discountAmount: FieldRef<"Order", 'Decimal'>
    readonly taxAmount: FieldRef<"Order", 'Decimal'>
    readonly finalAmount: FieldRef<"Order", 'Decimal'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
    readonly updatedAt: FieldRef<"Order", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
  }

  /**
   * Order createManyAndReturn
   */
  export type OrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
  }

  /**
   * Order.items
   */
  export type Order$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * Order.payments
   */
  export type Order$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Order.kotTickets
   */
  export type Order$kotTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KotTicket
     */
    select?: KotTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KotTicketInclude<ExtArgs> | null
    where?: KotTicketWhereInput
    orderBy?: KotTicketOrderByWithRelationInput | KotTicketOrderByWithRelationInput[]
    cursor?: KotTicketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: KotTicketScalarFieldEnum | KotTicketScalarFieldEnum[]
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model KotTicket
   */

  export type AggregateKotTicket = {
    _count: KotTicketCountAggregateOutputType | null
    _avg: KotTicketAvgAggregateOutputType | null
    _sum: KotTicketSumAggregateOutputType | null
    _min: KotTicketMinAggregateOutputType | null
    _max: KotTicketMaxAggregateOutputType | null
  }

  export type KotTicketAvgAggregateOutputType = {
    id: number | null
    orderId: number | null
  }

  export type KotTicketSumAggregateOutputType = {
    id: number | null
    orderId: number | null
  }

  export type KotTicketMinAggregateOutputType = {
    id: number | null
    orderId: number | null
    kotNumber: string | null
    status: string | null
    printedAt: Date | null
    createdAt: Date | null
  }

  export type KotTicketMaxAggregateOutputType = {
    id: number | null
    orderId: number | null
    kotNumber: string | null
    status: string | null
    printedAt: Date | null
    createdAt: Date | null
  }

  export type KotTicketCountAggregateOutputType = {
    id: number
    orderId: number
    kotNumber: number
    status: number
    printedAt: number
    createdAt: number
    _all: number
  }


  export type KotTicketAvgAggregateInputType = {
    id?: true
    orderId?: true
  }

  export type KotTicketSumAggregateInputType = {
    id?: true
    orderId?: true
  }

  export type KotTicketMinAggregateInputType = {
    id?: true
    orderId?: true
    kotNumber?: true
    status?: true
    printedAt?: true
    createdAt?: true
  }

  export type KotTicketMaxAggregateInputType = {
    id?: true
    orderId?: true
    kotNumber?: true
    status?: true
    printedAt?: true
    createdAt?: true
  }

  export type KotTicketCountAggregateInputType = {
    id?: true
    orderId?: true
    kotNumber?: true
    status?: true
    printedAt?: true
    createdAt?: true
    _all?: true
  }

  export type KotTicketAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KotTicket to aggregate.
     */
    where?: KotTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KotTickets to fetch.
     */
    orderBy?: KotTicketOrderByWithRelationInput | KotTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KotTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KotTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KotTickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned KotTickets
    **/
    _count?: true | KotTicketCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: KotTicketAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: KotTicketSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KotTicketMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KotTicketMaxAggregateInputType
  }

  export type GetKotTicketAggregateType<T extends KotTicketAggregateArgs> = {
        [P in keyof T & keyof AggregateKotTicket]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKotTicket[P]>
      : GetScalarType<T[P], AggregateKotTicket[P]>
  }




  export type KotTicketGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KotTicketWhereInput
    orderBy?: KotTicketOrderByWithAggregationInput | KotTicketOrderByWithAggregationInput[]
    by: KotTicketScalarFieldEnum[] | KotTicketScalarFieldEnum
    having?: KotTicketScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KotTicketCountAggregateInputType | true
    _avg?: KotTicketAvgAggregateInputType
    _sum?: KotTicketSumAggregateInputType
    _min?: KotTicketMinAggregateInputType
    _max?: KotTicketMaxAggregateInputType
  }

  export type KotTicketGroupByOutputType = {
    id: number
    orderId: number
    kotNumber: string
    status: string
    printedAt: Date | null
    createdAt: Date
    _count: KotTicketCountAggregateOutputType | null
    _avg: KotTicketAvgAggregateOutputType | null
    _sum: KotTicketSumAggregateOutputType | null
    _min: KotTicketMinAggregateOutputType | null
    _max: KotTicketMaxAggregateOutputType | null
  }

  type GetKotTicketGroupByPayload<T extends KotTicketGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KotTicketGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KotTicketGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KotTicketGroupByOutputType[P]>
            : GetScalarType<T[P], KotTicketGroupByOutputType[P]>
        }
      >
    >


  export type KotTicketSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    kotNumber?: boolean
    status?: boolean
    printedAt?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    items?: boolean | KotTicket$itemsArgs<ExtArgs>
    _count?: boolean | KotTicketCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kotTicket"]>

  export type KotTicketSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    kotNumber?: boolean
    status?: boolean
    printedAt?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kotTicket"]>

  export type KotTicketSelectScalar = {
    id?: boolean
    orderId?: boolean
    kotNumber?: boolean
    status?: boolean
    printedAt?: boolean
    createdAt?: boolean
  }

  export type KotTicketInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    items?: boolean | KotTicket$itemsArgs<ExtArgs>
    _count?: boolean | KotTicketCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type KotTicketIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }

  export type $KotTicketPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "KotTicket"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
      items: Prisma.$KotItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      orderId: number
      kotNumber: string
      status: string
      printedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["kotTicket"]>
    composites: {}
  }

  type KotTicketGetPayload<S extends boolean | null | undefined | KotTicketDefaultArgs> = $Result.GetResult<Prisma.$KotTicketPayload, S>

  type KotTicketCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<KotTicketFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: KotTicketCountAggregateInputType | true
    }

  export interface KotTicketDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['KotTicket'], meta: { name: 'KotTicket' } }
    /**
     * Find zero or one KotTicket that matches the filter.
     * @param {KotTicketFindUniqueArgs} args - Arguments to find a KotTicket
     * @example
     * // Get one KotTicket
     * const kotTicket = await prisma.kotTicket.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KotTicketFindUniqueArgs>(args: SelectSubset<T, KotTicketFindUniqueArgs<ExtArgs>>): Prisma__KotTicketClient<$Result.GetResult<Prisma.$KotTicketPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one KotTicket that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {KotTicketFindUniqueOrThrowArgs} args - Arguments to find a KotTicket
     * @example
     * // Get one KotTicket
     * const kotTicket = await prisma.kotTicket.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KotTicketFindUniqueOrThrowArgs>(args: SelectSubset<T, KotTicketFindUniqueOrThrowArgs<ExtArgs>>): Prisma__KotTicketClient<$Result.GetResult<Prisma.$KotTicketPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first KotTicket that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KotTicketFindFirstArgs} args - Arguments to find a KotTicket
     * @example
     * // Get one KotTicket
     * const kotTicket = await prisma.kotTicket.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KotTicketFindFirstArgs>(args?: SelectSubset<T, KotTicketFindFirstArgs<ExtArgs>>): Prisma__KotTicketClient<$Result.GetResult<Prisma.$KotTicketPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first KotTicket that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KotTicketFindFirstOrThrowArgs} args - Arguments to find a KotTicket
     * @example
     * // Get one KotTicket
     * const kotTicket = await prisma.kotTicket.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KotTicketFindFirstOrThrowArgs>(args?: SelectSubset<T, KotTicketFindFirstOrThrowArgs<ExtArgs>>): Prisma__KotTicketClient<$Result.GetResult<Prisma.$KotTicketPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more KotTickets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KotTicketFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all KotTickets
     * const kotTickets = await prisma.kotTicket.findMany()
     * 
     * // Get first 10 KotTickets
     * const kotTickets = await prisma.kotTicket.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const kotTicketWithIdOnly = await prisma.kotTicket.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends KotTicketFindManyArgs>(args?: SelectSubset<T, KotTicketFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KotTicketPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a KotTicket.
     * @param {KotTicketCreateArgs} args - Arguments to create a KotTicket.
     * @example
     * // Create one KotTicket
     * const KotTicket = await prisma.kotTicket.create({
     *   data: {
     *     // ... data to create a KotTicket
     *   }
     * })
     * 
     */
    create<T extends KotTicketCreateArgs>(args: SelectSubset<T, KotTicketCreateArgs<ExtArgs>>): Prisma__KotTicketClient<$Result.GetResult<Prisma.$KotTicketPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many KotTickets.
     * @param {KotTicketCreateManyArgs} args - Arguments to create many KotTickets.
     * @example
     * // Create many KotTickets
     * const kotTicket = await prisma.kotTicket.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends KotTicketCreateManyArgs>(args?: SelectSubset<T, KotTicketCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many KotTickets and returns the data saved in the database.
     * @param {KotTicketCreateManyAndReturnArgs} args - Arguments to create many KotTickets.
     * @example
     * // Create many KotTickets
     * const kotTicket = await prisma.kotTicket.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many KotTickets and only return the `id`
     * const kotTicketWithIdOnly = await prisma.kotTicket.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends KotTicketCreateManyAndReturnArgs>(args?: SelectSubset<T, KotTicketCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KotTicketPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a KotTicket.
     * @param {KotTicketDeleteArgs} args - Arguments to delete one KotTicket.
     * @example
     * // Delete one KotTicket
     * const KotTicket = await prisma.kotTicket.delete({
     *   where: {
     *     // ... filter to delete one KotTicket
     *   }
     * })
     * 
     */
    delete<T extends KotTicketDeleteArgs>(args: SelectSubset<T, KotTicketDeleteArgs<ExtArgs>>): Prisma__KotTicketClient<$Result.GetResult<Prisma.$KotTicketPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one KotTicket.
     * @param {KotTicketUpdateArgs} args - Arguments to update one KotTicket.
     * @example
     * // Update one KotTicket
     * const kotTicket = await prisma.kotTicket.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends KotTicketUpdateArgs>(args: SelectSubset<T, KotTicketUpdateArgs<ExtArgs>>): Prisma__KotTicketClient<$Result.GetResult<Prisma.$KotTicketPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more KotTickets.
     * @param {KotTicketDeleteManyArgs} args - Arguments to filter KotTickets to delete.
     * @example
     * // Delete a few KotTickets
     * const { count } = await prisma.kotTicket.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends KotTicketDeleteManyArgs>(args?: SelectSubset<T, KotTicketDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KotTickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KotTicketUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many KotTickets
     * const kotTicket = await prisma.kotTicket.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends KotTicketUpdateManyArgs>(args: SelectSubset<T, KotTicketUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one KotTicket.
     * @param {KotTicketUpsertArgs} args - Arguments to update or create a KotTicket.
     * @example
     * // Update or create a KotTicket
     * const kotTicket = await prisma.kotTicket.upsert({
     *   create: {
     *     // ... data to create a KotTicket
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the KotTicket we want to update
     *   }
     * })
     */
    upsert<T extends KotTicketUpsertArgs>(args: SelectSubset<T, KotTicketUpsertArgs<ExtArgs>>): Prisma__KotTicketClient<$Result.GetResult<Prisma.$KotTicketPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of KotTickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KotTicketCountArgs} args - Arguments to filter KotTickets to count.
     * @example
     * // Count the number of KotTickets
     * const count = await prisma.kotTicket.count({
     *   where: {
     *     // ... the filter for the KotTickets we want to count
     *   }
     * })
    **/
    count<T extends KotTicketCountArgs>(
      args?: Subset<T, KotTicketCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KotTicketCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a KotTicket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KotTicketAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends KotTicketAggregateArgs>(args: Subset<T, KotTicketAggregateArgs>): Prisma.PrismaPromise<GetKotTicketAggregateType<T>>

    /**
     * Group by KotTicket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KotTicketGroupByArgs} args - Group by arguments.
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
      T extends KotTicketGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KotTicketGroupByArgs['orderBy'] }
        : { orderBy?: KotTicketGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, KotTicketGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKotTicketGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the KotTicket model
   */
  readonly fields: KotTicketFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for KotTicket.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__KotTicketClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    items<T extends KotTicket$itemsArgs<ExtArgs> = {}>(args?: Subset<T, KotTicket$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KotItemPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the KotTicket model
   */ 
  interface KotTicketFieldRefs {
    readonly id: FieldRef<"KotTicket", 'Int'>
    readonly orderId: FieldRef<"KotTicket", 'Int'>
    readonly kotNumber: FieldRef<"KotTicket", 'String'>
    readonly status: FieldRef<"KotTicket", 'String'>
    readonly printedAt: FieldRef<"KotTicket", 'DateTime'>
    readonly createdAt: FieldRef<"KotTicket", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * KotTicket findUnique
   */
  export type KotTicketFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KotTicket
     */
    select?: KotTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KotTicketInclude<ExtArgs> | null
    /**
     * Filter, which KotTicket to fetch.
     */
    where: KotTicketWhereUniqueInput
  }

  /**
   * KotTicket findUniqueOrThrow
   */
  export type KotTicketFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KotTicket
     */
    select?: KotTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KotTicketInclude<ExtArgs> | null
    /**
     * Filter, which KotTicket to fetch.
     */
    where: KotTicketWhereUniqueInput
  }

  /**
   * KotTicket findFirst
   */
  export type KotTicketFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KotTicket
     */
    select?: KotTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KotTicketInclude<ExtArgs> | null
    /**
     * Filter, which KotTicket to fetch.
     */
    where?: KotTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KotTickets to fetch.
     */
    orderBy?: KotTicketOrderByWithRelationInput | KotTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KotTickets.
     */
    cursor?: KotTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KotTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KotTickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KotTickets.
     */
    distinct?: KotTicketScalarFieldEnum | KotTicketScalarFieldEnum[]
  }

  /**
   * KotTicket findFirstOrThrow
   */
  export type KotTicketFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KotTicket
     */
    select?: KotTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KotTicketInclude<ExtArgs> | null
    /**
     * Filter, which KotTicket to fetch.
     */
    where?: KotTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KotTickets to fetch.
     */
    orderBy?: KotTicketOrderByWithRelationInput | KotTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KotTickets.
     */
    cursor?: KotTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KotTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KotTickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KotTickets.
     */
    distinct?: KotTicketScalarFieldEnum | KotTicketScalarFieldEnum[]
  }

  /**
   * KotTicket findMany
   */
  export type KotTicketFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KotTicket
     */
    select?: KotTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KotTicketInclude<ExtArgs> | null
    /**
     * Filter, which KotTickets to fetch.
     */
    where?: KotTicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KotTickets to fetch.
     */
    orderBy?: KotTicketOrderByWithRelationInput | KotTicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing KotTickets.
     */
    cursor?: KotTicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KotTickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KotTickets.
     */
    skip?: number
    distinct?: KotTicketScalarFieldEnum | KotTicketScalarFieldEnum[]
  }

  /**
   * KotTicket create
   */
  export type KotTicketCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KotTicket
     */
    select?: KotTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KotTicketInclude<ExtArgs> | null
    /**
     * The data needed to create a KotTicket.
     */
    data: XOR<KotTicketCreateInput, KotTicketUncheckedCreateInput>
  }

  /**
   * KotTicket createMany
   */
  export type KotTicketCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many KotTickets.
     */
    data: KotTicketCreateManyInput | KotTicketCreateManyInput[]
  }

  /**
   * KotTicket createManyAndReturn
   */
  export type KotTicketCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KotTicket
     */
    select?: KotTicketSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many KotTickets.
     */
    data: KotTicketCreateManyInput | KotTicketCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KotTicketIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * KotTicket update
   */
  export type KotTicketUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KotTicket
     */
    select?: KotTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KotTicketInclude<ExtArgs> | null
    /**
     * The data needed to update a KotTicket.
     */
    data: XOR<KotTicketUpdateInput, KotTicketUncheckedUpdateInput>
    /**
     * Choose, which KotTicket to update.
     */
    where: KotTicketWhereUniqueInput
  }

  /**
   * KotTicket updateMany
   */
  export type KotTicketUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update KotTickets.
     */
    data: XOR<KotTicketUpdateManyMutationInput, KotTicketUncheckedUpdateManyInput>
    /**
     * Filter which KotTickets to update
     */
    where?: KotTicketWhereInput
  }

  /**
   * KotTicket upsert
   */
  export type KotTicketUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KotTicket
     */
    select?: KotTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KotTicketInclude<ExtArgs> | null
    /**
     * The filter to search for the KotTicket to update in case it exists.
     */
    where: KotTicketWhereUniqueInput
    /**
     * In case the KotTicket found by the `where` argument doesn't exist, create a new KotTicket with this data.
     */
    create: XOR<KotTicketCreateInput, KotTicketUncheckedCreateInput>
    /**
     * In case the KotTicket was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KotTicketUpdateInput, KotTicketUncheckedUpdateInput>
  }

  /**
   * KotTicket delete
   */
  export type KotTicketDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KotTicket
     */
    select?: KotTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KotTicketInclude<ExtArgs> | null
    /**
     * Filter which KotTicket to delete.
     */
    where: KotTicketWhereUniqueInput
  }

  /**
   * KotTicket deleteMany
   */
  export type KotTicketDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KotTickets to delete
     */
    where?: KotTicketWhereInput
  }

  /**
   * KotTicket.items
   */
  export type KotTicket$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KotItem
     */
    select?: KotItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KotItemInclude<ExtArgs> | null
    where?: KotItemWhereInput
    orderBy?: KotItemOrderByWithRelationInput | KotItemOrderByWithRelationInput[]
    cursor?: KotItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: KotItemScalarFieldEnum | KotItemScalarFieldEnum[]
  }

  /**
   * KotTicket without action
   */
  export type KotTicketDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KotTicket
     */
    select?: KotTicketSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KotTicketInclude<ExtArgs> | null
  }


  /**
   * Model KotItem
   */

  export type AggregateKotItem = {
    _count: KotItemCountAggregateOutputType | null
    _avg: KotItemAvgAggregateOutputType | null
    _sum: KotItemSumAggregateOutputType | null
    _min: KotItemMinAggregateOutputType | null
    _max: KotItemMaxAggregateOutputType | null
  }

  export type KotItemAvgAggregateOutputType = {
    id: number | null
    kotTicketId: number | null
    orderItemId: number | null
    menuItemId: number | null
    quantity: number | null
  }

  export type KotItemSumAggregateOutputType = {
    id: number | null
    kotTicketId: number | null
    orderItemId: number | null
    menuItemId: number | null
    quantity: number | null
  }

  export type KotItemMinAggregateOutputType = {
    id: number | null
    kotTicketId: number | null
    orderItemId: number | null
    menuItemId: number | null
    name: string | null
    quantity: number | null
    note: string | null
    status: string | null
    createdAt: Date | null
  }

  export type KotItemMaxAggregateOutputType = {
    id: number | null
    kotTicketId: number | null
    orderItemId: number | null
    menuItemId: number | null
    name: string | null
    quantity: number | null
    note: string | null
    status: string | null
    createdAt: Date | null
  }

  export type KotItemCountAggregateOutputType = {
    id: number
    kotTicketId: number
    orderItemId: number
    menuItemId: number
    name: number
    quantity: number
    note: number
    status: number
    createdAt: number
    _all: number
  }


  export type KotItemAvgAggregateInputType = {
    id?: true
    kotTicketId?: true
    orderItemId?: true
    menuItemId?: true
    quantity?: true
  }

  export type KotItemSumAggregateInputType = {
    id?: true
    kotTicketId?: true
    orderItemId?: true
    menuItemId?: true
    quantity?: true
  }

  export type KotItemMinAggregateInputType = {
    id?: true
    kotTicketId?: true
    orderItemId?: true
    menuItemId?: true
    name?: true
    quantity?: true
    note?: true
    status?: true
    createdAt?: true
  }

  export type KotItemMaxAggregateInputType = {
    id?: true
    kotTicketId?: true
    orderItemId?: true
    menuItemId?: true
    name?: true
    quantity?: true
    note?: true
    status?: true
    createdAt?: true
  }

  export type KotItemCountAggregateInputType = {
    id?: true
    kotTicketId?: true
    orderItemId?: true
    menuItemId?: true
    name?: true
    quantity?: true
    note?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type KotItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KotItem to aggregate.
     */
    where?: KotItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KotItems to fetch.
     */
    orderBy?: KotItemOrderByWithRelationInput | KotItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KotItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KotItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KotItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned KotItems
    **/
    _count?: true | KotItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: KotItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: KotItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KotItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KotItemMaxAggregateInputType
  }

  export type GetKotItemAggregateType<T extends KotItemAggregateArgs> = {
        [P in keyof T & keyof AggregateKotItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKotItem[P]>
      : GetScalarType<T[P], AggregateKotItem[P]>
  }




  export type KotItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KotItemWhereInput
    orderBy?: KotItemOrderByWithAggregationInput | KotItemOrderByWithAggregationInput[]
    by: KotItemScalarFieldEnum[] | KotItemScalarFieldEnum
    having?: KotItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KotItemCountAggregateInputType | true
    _avg?: KotItemAvgAggregateInputType
    _sum?: KotItemSumAggregateInputType
    _min?: KotItemMinAggregateInputType
    _max?: KotItemMaxAggregateInputType
  }

  export type KotItemGroupByOutputType = {
    id: number
    kotTicketId: number
    orderItemId: number | null
    menuItemId: number
    name: string
    quantity: number
    note: string | null
    status: string
    createdAt: Date
    _count: KotItemCountAggregateOutputType | null
    _avg: KotItemAvgAggregateOutputType | null
    _sum: KotItemSumAggregateOutputType | null
    _min: KotItemMinAggregateOutputType | null
    _max: KotItemMaxAggregateOutputType | null
  }

  type GetKotItemGroupByPayload<T extends KotItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KotItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KotItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KotItemGroupByOutputType[P]>
            : GetScalarType<T[P], KotItemGroupByOutputType[P]>
        }
      >
    >


  export type KotItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kotTicketId?: boolean
    orderItemId?: boolean
    menuItemId?: boolean
    name?: boolean
    quantity?: boolean
    note?: boolean
    status?: boolean
    createdAt?: boolean
    ticket?: boolean | KotTicketDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kotItem"]>

  export type KotItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kotTicketId?: boolean
    orderItemId?: boolean
    menuItemId?: boolean
    name?: boolean
    quantity?: boolean
    note?: boolean
    status?: boolean
    createdAt?: boolean
    ticket?: boolean | KotTicketDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kotItem"]>

  export type KotItemSelectScalar = {
    id?: boolean
    kotTicketId?: boolean
    orderItemId?: boolean
    menuItemId?: boolean
    name?: boolean
    quantity?: boolean
    note?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type KotItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ticket?: boolean | KotTicketDefaultArgs<ExtArgs>
  }
  export type KotItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    ticket?: boolean | KotTicketDefaultArgs<ExtArgs>
  }

  export type $KotItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "KotItem"
    objects: {
      ticket: Prisma.$KotTicketPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      kotTicketId: number
      orderItemId: number | null
      menuItemId: number
      name: string
      quantity: number
      note: string | null
      status: string
      createdAt: Date
    }, ExtArgs["result"]["kotItem"]>
    composites: {}
  }

  type KotItemGetPayload<S extends boolean | null | undefined | KotItemDefaultArgs> = $Result.GetResult<Prisma.$KotItemPayload, S>

  type KotItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<KotItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: KotItemCountAggregateInputType | true
    }

  export interface KotItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['KotItem'], meta: { name: 'KotItem' } }
    /**
     * Find zero or one KotItem that matches the filter.
     * @param {KotItemFindUniqueArgs} args - Arguments to find a KotItem
     * @example
     * // Get one KotItem
     * const kotItem = await prisma.kotItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KotItemFindUniqueArgs>(args: SelectSubset<T, KotItemFindUniqueArgs<ExtArgs>>): Prisma__KotItemClient<$Result.GetResult<Prisma.$KotItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one KotItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {KotItemFindUniqueOrThrowArgs} args - Arguments to find a KotItem
     * @example
     * // Get one KotItem
     * const kotItem = await prisma.kotItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KotItemFindUniqueOrThrowArgs>(args: SelectSubset<T, KotItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__KotItemClient<$Result.GetResult<Prisma.$KotItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first KotItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KotItemFindFirstArgs} args - Arguments to find a KotItem
     * @example
     * // Get one KotItem
     * const kotItem = await prisma.kotItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KotItemFindFirstArgs>(args?: SelectSubset<T, KotItemFindFirstArgs<ExtArgs>>): Prisma__KotItemClient<$Result.GetResult<Prisma.$KotItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first KotItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KotItemFindFirstOrThrowArgs} args - Arguments to find a KotItem
     * @example
     * // Get one KotItem
     * const kotItem = await prisma.kotItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KotItemFindFirstOrThrowArgs>(args?: SelectSubset<T, KotItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__KotItemClient<$Result.GetResult<Prisma.$KotItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more KotItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KotItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all KotItems
     * const kotItems = await prisma.kotItem.findMany()
     * 
     * // Get first 10 KotItems
     * const kotItems = await prisma.kotItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const kotItemWithIdOnly = await prisma.kotItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends KotItemFindManyArgs>(args?: SelectSubset<T, KotItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KotItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a KotItem.
     * @param {KotItemCreateArgs} args - Arguments to create a KotItem.
     * @example
     * // Create one KotItem
     * const KotItem = await prisma.kotItem.create({
     *   data: {
     *     // ... data to create a KotItem
     *   }
     * })
     * 
     */
    create<T extends KotItemCreateArgs>(args: SelectSubset<T, KotItemCreateArgs<ExtArgs>>): Prisma__KotItemClient<$Result.GetResult<Prisma.$KotItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many KotItems.
     * @param {KotItemCreateManyArgs} args - Arguments to create many KotItems.
     * @example
     * // Create many KotItems
     * const kotItem = await prisma.kotItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends KotItemCreateManyArgs>(args?: SelectSubset<T, KotItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many KotItems and returns the data saved in the database.
     * @param {KotItemCreateManyAndReturnArgs} args - Arguments to create many KotItems.
     * @example
     * // Create many KotItems
     * const kotItem = await prisma.kotItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many KotItems and only return the `id`
     * const kotItemWithIdOnly = await prisma.kotItem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends KotItemCreateManyAndReturnArgs>(args?: SelectSubset<T, KotItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KotItemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a KotItem.
     * @param {KotItemDeleteArgs} args - Arguments to delete one KotItem.
     * @example
     * // Delete one KotItem
     * const KotItem = await prisma.kotItem.delete({
     *   where: {
     *     // ... filter to delete one KotItem
     *   }
     * })
     * 
     */
    delete<T extends KotItemDeleteArgs>(args: SelectSubset<T, KotItemDeleteArgs<ExtArgs>>): Prisma__KotItemClient<$Result.GetResult<Prisma.$KotItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one KotItem.
     * @param {KotItemUpdateArgs} args - Arguments to update one KotItem.
     * @example
     * // Update one KotItem
     * const kotItem = await prisma.kotItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends KotItemUpdateArgs>(args: SelectSubset<T, KotItemUpdateArgs<ExtArgs>>): Prisma__KotItemClient<$Result.GetResult<Prisma.$KotItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more KotItems.
     * @param {KotItemDeleteManyArgs} args - Arguments to filter KotItems to delete.
     * @example
     * // Delete a few KotItems
     * const { count } = await prisma.kotItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends KotItemDeleteManyArgs>(args?: SelectSubset<T, KotItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KotItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KotItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many KotItems
     * const kotItem = await prisma.kotItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends KotItemUpdateManyArgs>(args: SelectSubset<T, KotItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one KotItem.
     * @param {KotItemUpsertArgs} args - Arguments to update or create a KotItem.
     * @example
     * // Update or create a KotItem
     * const kotItem = await prisma.kotItem.upsert({
     *   create: {
     *     // ... data to create a KotItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the KotItem we want to update
     *   }
     * })
     */
    upsert<T extends KotItemUpsertArgs>(args: SelectSubset<T, KotItemUpsertArgs<ExtArgs>>): Prisma__KotItemClient<$Result.GetResult<Prisma.$KotItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of KotItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KotItemCountArgs} args - Arguments to filter KotItems to count.
     * @example
     * // Count the number of KotItems
     * const count = await prisma.kotItem.count({
     *   where: {
     *     // ... the filter for the KotItems we want to count
     *   }
     * })
    **/
    count<T extends KotItemCountArgs>(
      args?: Subset<T, KotItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KotItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a KotItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KotItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends KotItemAggregateArgs>(args: Subset<T, KotItemAggregateArgs>): Prisma.PrismaPromise<GetKotItemAggregateType<T>>

    /**
     * Group by KotItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KotItemGroupByArgs} args - Group by arguments.
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
      T extends KotItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KotItemGroupByArgs['orderBy'] }
        : { orderBy?: KotItemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, KotItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKotItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the KotItem model
   */
  readonly fields: KotItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for KotItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__KotItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    ticket<T extends KotTicketDefaultArgs<ExtArgs> = {}>(args?: Subset<T, KotTicketDefaultArgs<ExtArgs>>): Prisma__KotTicketClient<$Result.GetResult<Prisma.$KotTicketPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the KotItem model
   */ 
  interface KotItemFieldRefs {
    readonly id: FieldRef<"KotItem", 'Int'>
    readonly kotTicketId: FieldRef<"KotItem", 'Int'>
    readonly orderItemId: FieldRef<"KotItem", 'Int'>
    readonly menuItemId: FieldRef<"KotItem", 'Int'>
    readonly name: FieldRef<"KotItem", 'String'>
    readonly quantity: FieldRef<"KotItem", 'Int'>
    readonly note: FieldRef<"KotItem", 'String'>
    readonly status: FieldRef<"KotItem", 'String'>
    readonly createdAt: FieldRef<"KotItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * KotItem findUnique
   */
  export type KotItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KotItem
     */
    select?: KotItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KotItemInclude<ExtArgs> | null
    /**
     * Filter, which KotItem to fetch.
     */
    where: KotItemWhereUniqueInput
  }

  /**
   * KotItem findUniqueOrThrow
   */
  export type KotItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KotItem
     */
    select?: KotItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KotItemInclude<ExtArgs> | null
    /**
     * Filter, which KotItem to fetch.
     */
    where: KotItemWhereUniqueInput
  }

  /**
   * KotItem findFirst
   */
  export type KotItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KotItem
     */
    select?: KotItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KotItemInclude<ExtArgs> | null
    /**
     * Filter, which KotItem to fetch.
     */
    where?: KotItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KotItems to fetch.
     */
    orderBy?: KotItemOrderByWithRelationInput | KotItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KotItems.
     */
    cursor?: KotItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KotItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KotItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KotItems.
     */
    distinct?: KotItemScalarFieldEnum | KotItemScalarFieldEnum[]
  }

  /**
   * KotItem findFirstOrThrow
   */
  export type KotItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KotItem
     */
    select?: KotItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KotItemInclude<ExtArgs> | null
    /**
     * Filter, which KotItem to fetch.
     */
    where?: KotItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KotItems to fetch.
     */
    orderBy?: KotItemOrderByWithRelationInput | KotItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KotItems.
     */
    cursor?: KotItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KotItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KotItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KotItems.
     */
    distinct?: KotItemScalarFieldEnum | KotItemScalarFieldEnum[]
  }

  /**
   * KotItem findMany
   */
  export type KotItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KotItem
     */
    select?: KotItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KotItemInclude<ExtArgs> | null
    /**
     * Filter, which KotItems to fetch.
     */
    where?: KotItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KotItems to fetch.
     */
    orderBy?: KotItemOrderByWithRelationInput | KotItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing KotItems.
     */
    cursor?: KotItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KotItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KotItems.
     */
    skip?: number
    distinct?: KotItemScalarFieldEnum | KotItemScalarFieldEnum[]
  }

  /**
   * KotItem create
   */
  export type KotItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KotItem
     */
    select?: KotItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KotItemInclude<ExtArgs> | null
    /**
     * The data needed to create a KotItem.
     */
    data: XOR<KotItemCreateInput, KotItemUncheckedCreateInput>
  }

  /**
   * KotItem createMany
   */
  export type KotItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many KotItems.
     */
    data: KotItemCreateManyInput | KotItemCreateManyInput[]
  }

  /**
   * KotItem createManyAndReturn
   */
  export type KotItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KotItem
     */
    select?: KotItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many KotItems.
     */
    data: KotItemCreateManyInput | KotItemCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KotItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * KotItem update
   */
  export type KotItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KotItem
     */
    select?: KotItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KotItemInclude<ExtArgs> | null
    /**
     * The data needed to update a KotItem.
     */
    data: XOR<KotItemUpdateInput, KotItemUncheckedUpdateInput>
    /**
     * Choose, which KotItem to update.
     */
    where: KotItemWhereUniqueInput
  }

  /**
   * KotItem updateMany
   */
  export type KotItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update KotItems.
     */
    data: XOR<KotItemUpdateManyMutationInput, KotItemUncheckedUpdateManyInput>
    /**
     * Filter which KotItems to update
     */
    where?: KotItemWhereInput
  }

  /**
   * KotItem upsert
   */
  export type KotItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KotItem
     */
    select?: KotItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KotItemInclude<ExtArgs> | null
    /**
     * The filter to search for the KotItem to update in case it exists.
     */
    where: KotItemWhereUniqueInput
    /**
     * In case the KotItem found by the `where` argument doesn't exist, create a new KotItem with this data.
     */
    create: XOR<KotItemCreateInput, KotItemUncheckedCreateInput>
    /**
     * In case the KotItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KotItemUpdateInput, KotItemUncheckedUpdateInput>
  }

  /**
   * KotItem delete
   */
  export type KotItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KotItem
     */
    select?: KotItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KotItemInclude<ExtArgs> | null
    /**
     * Filter which KotItem to delete.
     */
    where: KotItemWhereUniqueInput
  }

  /**
   * KotItem deleteMany
   */
  export type KotItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KotItems to delete
     */
    where?: KotItemWhereInput
  }

  /**
   * KotItem without action
   */
  export type KotItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KotItem
     */
    select?: KotItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KotItemInclude<ExtArgs> | null
  }


  /**
   * Model BillSequence
   */

  export type AggregateBillSequence = {
    _count: BillSequenceCountAggregateOutputType | null
    _avg: BillSequenceAvgAggregateOutputType | null
    _sum: BillSequenceSumAggregateOutputType | null
    _min: BillSequenceMinAggregateOutputType | null
    _max: BillSequenceMaxAggregateOutputType | null
  }

  export type BillSequenceAvgAggregateOutputType = {
    id: number | null
    lastNumber: number | null
  }

  export type BillSequenceSumAggregateOutputType = {
    id: number | null
    lastNumber: number | null
  }

  export type BillSequenceMinAggregateOutputType = {
    id: number | null
    businessDate: string | null
    lastNumber: number | null
    updatedAt: Date | null
  }

  export type BillSequenceMaxAggregateOutputType = {
    id: number | null
    businessDate: string | null
    lastNumber: number | null
    updatedAt: Date | null
  }

  export type BillSequenceCountAggregateOutputType = {
    id: number
    businessDate: number
    lastNumber: number
    updatedAt: number
    _all: number
  }


  export type BillSequenceAvgAggregateInputType = {
    id?: true
    lastNumber?: true
  }

  export type BillSequenceSumAggregateInputType = {
    id?: true
    lastNumber?: true
  }

  export type BillSequenceMinAggregateInputType = {
    id?: true
    businessDate?: true
    lastNumber?: true
    updatedAt?: true
  }

  export type BillSequenceMaxAggregateInputType = {
    id?: true
    businessDate?: true
    lastNumber?: true
    updatedAt?: true
  }

  export type BillSequenceCountAggregateInputType = {
    id?: true
    businessDate?: true
    lastNumber?: true
    updatedAt?: true
    _all?: true
  }

  export type BillSequenceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BillSequence to aggregate.
     */
    where?: BillSequenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BillSequences to fetch.
     */
    orderBy?: BillSequenceOrderByWithRelationInput | BillSequenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BillSequenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BillSequences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BillSequences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BillSequences
    **/
    _count?: true | BillSequenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BillSequenceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BillSequenceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BillSequenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BillSequenceMaxAggregateInputType
  }

  export type GetBillSequenceAggregateType<T extends BillSequenceAggregateArgs> = {
        [P in keyof T & keyof AggregateBillSequence]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBillSequence[P]>
      : GetScalarType<T[P], AggregateBillSequence[P]>
  }




  export type BillSequenceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BillSequenceWhereInput
    orderBy?: BillSequenceOrderByWithAggregationInput | BillSequenceOrderByWithAggregationInput[]
    by: BillSequenceScalarFieldEnum[] | BillSequenceScalarFieldEnum
    having?: BillSequenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BillSequenceCountAggregateInputType | true
    _avg?: BillSequenceAvgAggregateInputType
    _sum?: BillSequenceSumAggregateInputType
    _min?: BillSequenceMinAggregateInputType
    _max?: BillSequenceMaxAggregateInputType
  }

  export type BillSequenceGroupByOutputType = {
    id: number
    businessDate: string
    lastNumber: number
    updatedAt: Date
    _count: BillSequenceCountAggregateOutputType | null
    _avg: BillSequenceAvgAggregateOutputType | null
    _sum: BillSequenceSumAggregateOutputType | null
    _min: BillSequenceMinAggregateOutputType | null
    _max: BillSequenceMaxAggregateOutputType | null
  }

  type GetBillSequenceGroupByPayload<T extends BillSequenceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BillSequenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BillSequenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BillSequenceGroupByOutputType[P]>
            : GetScalarType<T[P], BillSequenceGroupByOutputType[P]>
        }
      >
    >


  export type BillSequenceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    businessDate?: boolean
    lastNumber?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["billSequence"]>

  export type BillSequenceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    businessDate?: boolean
    lastNumber?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["billSequence"]>

  export type BillSequenceSelectScalar = {
    id?: boolean
    businessDate?: boolean
    lastNumber?: boolean
    updatedAt?: boolean
  }


  export type $BillSequencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BillSequence"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      businessDate: string
      lastNumber: number
      updatedAt: Date
    }, ExtArgs["result"]["billSequence"]>
    composites: {}
  }

  type BillSequenceGetPayload<S extends boolean | null | undefined | BillSequenceDefaultArgs> = $Result.GetResult<Prisma.$BillSequencePayload, S>

  type BillSequenceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BillSequenceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BillSequenceCountAggregateInputType | true
    }

  export interface BillSequenceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BillSequence'], meta: { name: 'BillSequence' } }
    /**
     * Find zero or one BillSequence that matches the filter.
     * @param {BillSequenceFindUniqueArgs} args - Arguments to find a BillSequence
     * @example
     * // Get one BillSequence
     * const billSequence = await prisma.billSequence.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BillSequenceFindUniqueArgs>(args: SelectSubset<T, BillSequenceFindUniqueArgs<ExtArgs>>): Prisma__BillSequenceClient<$Result.GetResult<Prisma.$BillSequencePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one BillSequence that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BillSequenceFindUniqueOrThrowArgs} args - Arguments to find a BillSequence
     * @example
     * // Get one BillSequence
     * const billSequence = await prisma.billSequence.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BillSequenceFindUniqueOrThrowArgs>(args: SelectSubset<T, BillSequenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BillSequenceClient<$Result.GetResult<Prisma.$BillSequencePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first BillSequence that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillSequenceFindFirstArgs} args - Arguments to find a BillSequence
     * @example
     * // Get one BillSequence
     * const billSequence = await prisma.billSequence.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BillSequenceFindFirstArgs>(args?: SelectSubset<T, BillSequenceFindFirstArgs<ExtArgs>>): Prisma__BillSequenceClient<$Result.GetResult<Prisma.$BillSequencePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first BillSequence that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillSequenceFindFirstOrThrowArgs} args - Arguments to find a BillSequence
     * @example
     * // Get one BillSequence
     * const billSequence = await prisma.billSequence.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BillSequenceFindFirstOrThrowArgs>(args?: SelectSubset<T, BillSequenceFindFirstOrThrowArgs<ExtArgs>>): Prisma__BillSequenceClient<$Result.GetResult<Prisma.$BillSequencePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more BillSequences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillSequenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BillSequences
     * const billSequences = await prisma.billSequence.findMany()
     * 
     * // Get first 10 BillSequences
     * const billSequences = await prisma.billSequence.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const billSequenceWithIdOnly = await prisma.billSequence.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BillSequenceFindManyArgs>(args?: SelectSubset<T, BillSequenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillSequencePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a BillSequence.
     * @param {BillSequenceCreateArgs} args - Arguments to create a BillSequence.
     * @example
     * // Create one BillSequence
     * const BillSequence = await prisma.billSequence.create({
     *   data: {
     *     // ... data to create a BillSequence
     *   }
     * })
     * 
     */
    create<T extends BillSequenceCreateArgs>(args: SelectSubset<T, BillSequenceCreateArgs<ExtArgs>>): Prisma__BillSequenceClient<$Result.GetResult<Prisma.$BillSequencePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many BillSequences.
     * @param {BillSequenceCreateManyArgs} args - Arguments to create many BillSequences.
     * @example
     * // Create many BillSequences
     * const billSequence = await prisma.billSequence.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BillSequenceCreateManyArgs>(args?: SelectSubset<T, BillSequenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BillSequences and returns the data saved in the database.
     * @param {BillSequenceCreateManyAndReturnArgs} args - Arguments to create many BillSequences.
     * @example
     * // Create many BillSequences
     * const billSequence = await prisma.billSequence.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BillSequences and only return the `id`
     * const billSequenceWithIdOnly = await prisma.billSequence.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BillSequenceCreateManyAndReturnArgs>(args?: SelectSubset<T, BillSequenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillSequencePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a BillSequence.
     * @param {BillSequenceDeleteArgs} args - Arguments to delete one BillSequence.
     * @example
     * // Delete one BillSequence
     * const BillSequence = await prisma.billSequence.delete({
     *   where: {
     *     // ... filter to delete one BillSequence
     *   }
     * })
     * 
     */
    delete<T extends BillSequenceDeleteArgs>(args: SelectSubset<T, BillSequenceDeleteArgs<ExtArgs>>): Prisma__BillSequenceClient<$Result.GetResult<Prisma.$BillSequencePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one BillSequence.
     * @param {BillSequenceUpdateArgs} args - Arguments to update one BillSequence.
     * @example
     * // Update one BillSequence
     * const billSequence = await prisma.billSequence.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BillSequenceUpdateArgs>(args: SelectSubset<T, BillSequenceUpdateArgs<ExtArgs>>): Prisma__BillSequenceClient<$Result.GetResult<Prisma.$BillSequencePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more BillSequences.
     * @param {BillSequenceDeleteManyArgs} args - Arguments to filter BillSequences to delete.
     * @example
     * // Delete a few BillSequences
     * const { count } = await prisma.billSequence.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BillSequenceDeleteManyArgs>(args?: SelectSubset<T, BillSequenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BillSequences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillSequenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BillSequences
     * const billSequence = await prisma.billSequence.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BillSequenceUpdateManyArgs>(args: SelectSubset<T, BillSequenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BillSequence.
     * @param {BillSequenceUpsertArgs} args - Arguments to update or create a BillSequence.
     * @example
     * // Update or create a BillSequence
     * const billSequence = await prisma.billSequence.upsert({
     *   create: {
     *     // ... data to create a BillSequence
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BillSequence we want to update
     *   }
     * })
     */
    upsert<T extends BillSequenceUpsertArgs>(args: SelectSubset<T, BillSequenceUpsertArgs<ExtArgs>>): Prisma__BillSequenceClient<$Result.GetResult<Prisma.$BillSequencePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of BillSequences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillSequenceCountArgs} args - Arguments to filter BillSequences to count.
     * @example
     * // Count the number of BillSequences
     * const count = await prisma.billSequence.count({
     *   where: {
     *     // ... the filter for the BillSequences we want to count
     *   }
     * })
    **/
    count<T extends BillSequenceCountArgs>(
      args?: Subset<T, BillSequenceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BillSequenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BillSequence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillSequenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BillSequenceAggregateArgs>(args: Subset<T, BillSequenceAggregateArgs>): Prisma.PrismaPromise<GetBillSequenceAggregateType<T>>

    /**
     * Group by BillSequence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillSequenceGroupByArgs} args - Group by arguments.
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
      T extends BillSequenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BillSequenceGroupByArgs['orderBy'] }
        : { orderBy?: BillSequenceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BillSequenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBillSequenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BillSequence model
   */
  readonly fields: BillSequenceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BillSequence.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BillSequenceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the BillSequence model
   */ 
  interface BillSequenceFieldRefs {
    readonly id: FieldRef<"BillSequence", 'Int'>
    readonly businessDate: FieldRef<"BillSequence", 'String'>
    readonly lastNumber: FieldRef<"BillSequence", 'Int'>
    readonly updatedAt: FieldRef<"BillSequence", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BillSequence findUnique
   */
  export type BillSequenceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillSequence
     */
    select?: BillSequenceSelect<ExtArgs> | null
    /**
     * Filter, which BillSequence to fetch.
     */
    where: BillSequenceWhereUniqueInput
  }

  /**
   * BillSequence findUniqueOrThrow
   */
  export type BillSequenceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillSequence
     */
    select?: BillSequenceSelect<ExtArgs> | null
    /**
     * Filter, which BillSequence to fetch.
     */
    where: BillSequenceWhereUniqueInput
  }

  /**
   * BillSequence findFirst
   */
  export type BillSequenceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillSequence
     */
    select?: BillSequenceSelect<ExtArgs> | null
    /**
     * Filter, which BillSequence to fetch.
     */
    where?: BillSequenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BillSequences to fetch.
     */
    orderBy?: BillSequenceOrderByWithRelationInput | BillSequenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BillSequences.
     */
    cursor?: BillSequenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BillSequences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BillSequences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BillSequences.
     */
    distinct?: BillSequenceScalarFieldEnum | BillSequenceScalarFieldEnum[]
  }

  /**
   * BillSequence findFirstOrThrow
   */
  export type BillSequenceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillSequence
     */
    select?: BillSequenceSelect<ExtArgs> | null
    /**
     * Filter, which BillSequence to fetch.
     */
    where?: BillSequenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BillSequences to fetch.
     */
    orderBy?: BillSequenceOrderByWithRelationInput | BillSequenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BillSequences.
     */
    cursor?: BillSequenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BillSequences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BillSequences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BillSequences.
     */
    distinct?: BillSequenceScalarFieldEnum | BillSequenceScalarFieldEnum[]
  }

  /**
   * BillSequence findMany
   */
  export type BillSequenceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillSequence
     */
    select?: BillSequenceSelect<ExtArgs> | null
    /**
     * Filter, which BillSequences to fetch.
     */
    where?: BillSequenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BillSequences to fetch.
     */
    orderBy?: BillSequenceOrderByWithRelationInput | BillSequenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BillSequences.
     */
    cursor?: BillSequenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BillSequences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BillSequences.
     */
    skip?: number
    distinct?: BillSequenceScalarFieldEnum | BillSequenceScalarFieldEnum[]
  }

  /**
   * BillSequence create
   */
  export type BillSequenceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillSequence
     */
    select?: BillSequenceSelect<ExtArgs> | null
    /**
     * The data needed to create a BillSequence.
     */
    data: XOR<BillSequenceCreateInput, BillSequenceUncheckedCreateInput>
  }

  /**
   * BillSequence createMany
   */
  export type BillSequenceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BillSequences.
     */
    data: BillSequenceCreateManyInput | BillSequenceCreateManyInput[]
  }

  /**
   * BillSequence createManyAndReturn
   */
  export type BillSequenceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillSequence
     */
    select?: BillSequenceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many BillSequences.
     */
    data: BillSequenceCreateManyInput | BillSequenceCreateManyInput[]
  }

  /**
   * BillSequence update
   */
  export type BillSequenceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillSequence
     */
    select?: BillSequenceSelect<ExtArgs> | null
    /**
     * The data needed to update a BillSequence.
     */
    data: XOR<BillSequenceUpdateInput, BillSequenceUncheckedUpdateInput>
    /**
     * Choose, which BillSequence to update.
     */
    where: BillSequenceWhereUniqueInput
  }

  /**
   * BillSequence updateMany
   */
  export type BillSequenceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BillSequences.
     */
    data: XOR<BillSequenceUpdateManyMutationInput, BillSequenceUncheckedUpdateManyInput>
    /**
     * Filter which BillSequences to update
     */
    where?: BillSequenceWhereInput
  }

  /**
   * BillSequence upsert
   */
  export type BillSequenceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillSequence
     */
    select?: BillSequenceSelect<ExtArgs> | null
    /**
     * The filter to search for the BillSequence to update in case it exists.
     */
    where: BillSequenceWhereUniqueInput
    /**
     * In case the BillSequence found by the `where` argument doesn't exist, create a new BillSequence with this data.
     */
    create: XOR<BillSequenceCreateInput, BillSequenceUncheckedCreateInput>
    /**
     * In case the BillSequence was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BillSequenceUpdateInput, BillSequenceUncheckedUpdateInput>
  }

  /**
   * BillSequence delete
   */
  export type BillSequenceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillSequence
     */
    select?: BillSequenceSelect<ExtArgs> | null
    /**
     * Filter which BillSequence to delete.
     */
    where: BillSequenceWhereUniqueInput
  }

  /**
   * BillSequence deleteMany
   */
  export type BillSequenceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BillSequences to delete
     */
    where?: BillSequenceWhereInput
  }

  /**
   * BillSequence without action
   */
  export type BillSequenceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BillSequence
     */
    select?: BillSequenceSelect<ExtArgs> | null
  }


  /**
   * Model OrderItem
   */

  export type AggregateOrderItem = {
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  export type OrderItemAvgAggregateOutputType = {
    id: number | null
    orderId: number | null
    menuItemId: number | null
    price: Decimal | null
    quantity: number | null
  }

  export type OrderItemSumAggregateOutputType = {
    id: number | null
    orderId: number | null
    menuItemId: number | null
    price: Decimal | null
    quantity: number | null
  }

  export type OrderItemMinAggregateOutputType = {
    id: number | null
    orderId: number | null
    menuItemId: number | null
    name: string | null
    price: Decimal | null
    quantity: number | null
    createdAt: Date | null
  }

  export type OrderItemMaxAggregateOutputType = {
    id: number | null
    orderId: number | null
    menuItemId: number | null
    name: string | null
    price: Decimal | null
    quantity: number | null
    createdAt: Date | null
  }

  export type OrderItemCountAggregateOutputType = {
    id: number
    orderId: number
    menuItemId: number
    name: number
    price: number
    quantity: number
    createdAt: number
    _all: number
  }


  export type OrderItemAvgAggregateInputType = {
    id?: true
    orderId?: true
    menuItemId?: true
    price?: true
    quantity?: true
  }

  export type OrderItemSumAggregateInputType = {
    id?: true
    orderId?: true
    menuItemId?: true
    price?: true
    quantity?: true
  }

  export type OrderItemMinAggregateInputType = {
    id?: true
    orderId?: true
    menuItemId?: true
    name?: true
    price?: true
    quantity?: true
    createdAt?: true
  }

  export type OrderItemMaxAggregateInputType = {
    id?: true
    orderId?: true
    menuItemId?: true
    name?: true
    price?: true
    quantity?: true
    createdAt?: true
  }

  export type OrderItemCountAggregateInputType = {
    id?: true
    orderId?: true
    menuItemId?: true
    name?: true
    price?: true
    quantity?: true
    createdAt?: true
    _all?: true
  }

  export type OrderItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItem to aggregate.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderItems
    **/
    _count?: true | OrderItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderItemMaxAggregateInputType
  }

  export type GetOrderItemAggregateType<T extends OrderItemAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderItem[P]>
      : GetScalarType<T[P], AggregateOrderItem[P]>
  }




  export type OrderItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithAggregationInput | OrderItemOrderByWithAggregationInput[]
    by: OrderItemScalarFieldEnum[] | OrderItemScalarFieldEnum
    having?: OrderItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderItemCountAggregateInputType | true
    _avg?: OrderItemAvgAggregateInputType
    _sum?: OrderItemSumAggregateInputType
    _min?: OrderItemMinAggregateInputType
    _max?: OrderItemMaxAggregateInputType
  }

  export type OrderItemGroupByOutputType = {
    id: number
    orderId: number
    menuItemId: number
    name: string
    price: Decimal
    quantity: number
    createdAt: Date
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  type GetOrderItemGroupByPayload<T extends OrderItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
            : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
        }
      >
    >


  export type OrderItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    menuItemId?: boolean
    name?: boolean
    price?: boolean
    quantity?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    menuItem?: boolean | MenuItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    menuItemId?: boolean
    name?: boolean
    price?: boolean
    quantity?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    menuItem?: boolean | MenuItemDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>

  export type OrderItemSelectScalar = {
    id?: boolean
    orderId?: boolean
    menuItemId?: boolean
    name?: boolean
    price?: boolean
    quantity?: boolean
    createdAt?: boolean
  }

  export type OrderItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    menuItem?: boolean | MenuItemDefaultArgs<ExtArgs>
  }
  export type OrderItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    menuItem?: boolean | MenuItemDefaultArgs<ExtArgs>
  }

  export type $OrderItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderItem"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
      menuItem: Prisma.$MenuItemPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      orderId: number
      menuItemId: number
      name: string
      price: Prisma.Decimal
      quantity: number
      createdAt: Date
    }, ExtArgs["result"]["orderItem"]>
    composites: {}
  }

  type OrderItemGetPayload<S extends boolean | null | undefined | OrderItemDefaultArgs> = $Result.GetResult<Prisma.$OrderItemPayload, S>

  type OrderItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<OrderItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: OrderItemCountAggregateInputType | true
    }

  export interface OrderItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderItem'], meta: { name: 'OrderItem' } }
    /**
     * Find zero or one OrderItem that matches the filter.
     * @param {OrderItemFindUniqueArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderItemFindUniqueArgs>(args: SelectSubset<T, OrderItemFindUniqueArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one OrderItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {OrderItemFindUniqueOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderItemFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first OrderItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderItemFindFirstArgs>(args?: SelectSubset<T, OrderItemFindFirstArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first OrderItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderItemFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more OrderItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderItems
     * const orderItems = await prisma.orderItem.findMany()
     * 
     * // Get first 10 OrderItems
     * const orderItems = await prisma.orderItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderItemFindManyArgs>(args?: SelectSubset<T, OrderItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a OrderItem.
     * @param {OrderItemCreateArgs} args - Arguments to create a OrderItem.
     * @example
     * // Create one OrderItem
     * const OrderItem = await prisma.orderItem.create({
     *   data: {
     *     // ... data to create a OrderItem
     *   }
     * })
     * 
     */
    create<T extends OrderItemCreateArgs>(args: SelectSubset<T, OrderItemCreateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many OrderItems.
     * @param {OrderItemCreateManyArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderItemCreateManyArgs>(args?: SelectSubset<T, OrderItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrderItems and returns the data saved in the database.
     * @param {OrderItemCreateManyAndReturnArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrderItems and only return the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderItemCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a OrderItem.
     * @param {OrderItemDeleteArgs} args - Arguments to delete one OrderItem.
     * @example
     * // Delete one OrderItem
     * const OrderItem = await prisma.orderItem.delete({
     *   where: {
     *     // ... filter to delete one OrderItem
     *   }
     * })
     * 
     */
    delete<T extends OrderItemDeleteArgs>(args: SelectSubset<T, OrderItemDeleteArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one OrderItem.
     * @param {OrderItemUpdateArgs} args - Arguments to update one OrderItem.
     * @example
     * // Update one OrderItem
     * const orderItem = await prisma.orderItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderItemUpdateArgs>(args: SelectSubset<T, OrderItemUpdateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more OrderItems.
     * @param {OrderItemDeleteManyArgs} args - Arguments to filter OrderItems to delete.
     * @example
     * // Delete a few OrderItems
     * const { count } = await prisma.orderItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderItemDeleteManyArgs>(args?: SelectSubset<T, OrderItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderItemUpdateManyArgs>(args: SelectSubset<T, OrderItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OrderItem.
     * @param {OrderItemUpsertArgs} args - Arguments to update or create a OrderItem.
     * @example
     * // Update or create a OrderItem
     * const orderItem = await prisma.orderItem.upsert({
     *   create: {
     *     // ... data to create a OrderItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderItem we want to update
     *   }
     * })
     */
    upsert<T extends OrderItemUpsertArgs>(args: SelectSubset<T, OrderItemUpsertArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemCountArgs} args - Arguments to filter OrderItems to count.
     * @example
     * // Count the number of OrderItems
     * const count = await prisma.orderItem.count({
     *   where: {
     *     // ... the filter for the OrderItems we want to count
     *   }
     * })
    **/
    count<T extends OrderItemCountArgs>(
      args?: Subset<T, OrderItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OrderItemAggregateArgs>(args: Subset<T, OrderItemAggregateArgs>): Prisma.PrismaPromise<GetOrderItemAggregateType<T>>

    /**
     * Group by OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemGroupByArgs} args - Group by arguments.
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
      T extends OrderItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderItemGroupByArgs['orderBy'] }
        : { orderBy?: OrderItemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, OrderItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderItem model
   */
  readonly fields: OrderItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    menuItem<T extends MenuItemDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MenuItemDefaultArgs<ExtArgs>>): Prisma__MenuItemClient<$Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the OrderItem model
   */ 
  interface OrderItemFieldRefs {
    readonly id: FieldRef<"OrderItem", 'Int'>
    readonly orderId: FieldRef<"OrderItem", 'Int'>
    readonly menuItemId: FieldRef<"OrderItem", 'Int'>
    readonly name: FieldRef<"OrderItem", 'String'>
    readonly price: FieldRef<"OrderItem", 'Decimal'>
    readonly quantity: FieldRef<"OrderItem", 'Int'>
    readonly createdAt: FieldRef<"OrderItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OrderItem findUnique
   */
  export type OrderItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findUniqueOrThrow
   */
  export type OrderItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findFirst
   */
  export type OrderItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findFirstOrThrow
   */
  export type OrderItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findMany
   */
  export type OrderItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItems to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem create
   */
  export type OrderItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderItem.
     */
    data: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
  }

  /**
   * OrderItem createMany
   */
  export type OrderItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
  }

  /**
   * OrderItem createManyAndReturn
   */
  export type OrderItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderItem update
   */
  export type OrderItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderItem.
     */
    data: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
    /**
     * Choose, which OrderItem to update.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem updateMany
   */
  export type OrderItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
  }

  /**
   * OrderItem upsert
   */
  export type OrderItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderItem to update in case it exists.
     */
    where: OrderItemWhereUniqueInput
    /**
     * In case the OrderItem found by the `where` argument doesn't exist, create a new OrderItem with this data.
     */
    create: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
    /**
     * In case the OrderItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
  }

  /**
   * OrderItem delete
   */
  export type OrderItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter which OrderItem to delete.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem deleteMany
   */
  export type OrderItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItems to delete
     */
    where?: OrderItemWhereInput
  }

  /**
   * OrderItem without action
   */
  export type OrderItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    id: number | null
    orderId: number | null
    amount: Decimal | null
    settledAmount: Decimal | null
  }

  export type PaymentSumAggregateOutputType = {
    id: number | null
    orderId: number | null
    amount: Decimal | null
    settledAmount: Decimal | null
  }

  export type PaymentMinAggregateOutputType = {
    id: number | null
    orderId: number | null
    method: string | null
    source: string | null
    status: string | null
    amount: Decimal | null
    settledAmount: Decimal | null
    referenceId: string | null
    settledAt: Date | null
    createdAt: Date | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: number | null
    orderId: number | null
    method: string | null
    source: string | null
    status: string | null
    amount: Decimal | null
    settledAmount: Decimal | null
    referenceId: string | null
    settledAt: Date | null
    createdAt: Date | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    orderId: number
    method: number
    source: number
    status: number
    amount: number
    settledAmount: number
    referenceId: number
    settledAt: number
    createdAt: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    id?: true
    orderId?: true
    amount?: true
    settledAmount?: true
  }

  export type PaymentSumAggregateInputType = {
    id?: true
    orderId?: true
    amount?: true
    settledAmount?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    orderId?: true
    method?: true
    source?: true
    status?: true
    amount?: true
    settledAmount?: true
    referenceId?: true
    settledAt?: true
    createdAt?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    orderId?: true
    method?: true
    source?: true
    status?: true
    amount?: true
    settledAmount?: true
    referenceId?: true
    settledAt?: true
    createdAt?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    orderId?: true
    method?: true
    source?: true
    status?: true
    amount?: true
    settledAmount?: true
    referenceId?: true
    settledAt?: true
    createdAt?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: number
    orderId: number
    method: string
    source: string
    status: string
    amount: Decimal
    settledAmount: Decimal
    referenceId: string | null
    settledAt: Date | null
    createdAt: Date
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    method?: boolean
    source?: boolean
    status?: boolean
    amount?: boolean
    settledAmount?: boolean
    referenceId?: boolean
    settledAt?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    method?: boolean
    source?: boolean
    status?: boolean
    amount?: boolean
    settledAmount?: boolean
    referenceId?: boolean
    settledAt?: boolean
    createdAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    orderId?: boolean
    method?: boolean
    source?: boolean
    status?: boolean
    amount?: boolean
    settledAmount?: boolean
    referenceId?: boolean
    settledAt?: boolean
    createdAt?: boolean
  }

  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      orderId: number
      method: string
      source: string
      status: string
      amount: Prisma.Decimal
      settledAmount: Prisma.Decimal
      referenceId: string | null
      settledAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
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
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the Payment model
   */ 
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'Int'>
    readonly orderId: FieldRef<"Payment", 'Int'>
    readonly method: FieldRef<"Payment", 'String'>
    readonly source: FieldRef<"Payment", 'String'>
    readonly status: FieldRef<"Payment", 'String'>
    readonly amount: FieldRef<"Payment", 'Decimal'>
    readonly settledAmount: FieldRef<"Payment", 'Decimal'>
    readonly referenceId: FieldRef<"Payment", 'String'>
    readonly settledAt: FieldRef<"Payment", 'DateTime'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Model Expense
   */

  export type AggregateExpense = {
    _count: ExpenseCountAggregateOutputType | null
    _avg: ExpenseAvgAggregateOutputType | null
    _sum: ExpenseSumAggregateOutputType | null
    _min: ExpenseMinAggregateOutputType | null
    _max: ExpenseMaxAggregateOutputType | null
  }

  export type ExpenseAvgAggregateOutputType = {
    id: number | null
    amount: Decimal | null
  }

  export type ExpenseSumAggregateOutputType = {
    id: number | null
    amount: Decimal | null
  }

  export type ExpenseMinAggregateOutputType = {
    id: number | null
    expenseDate: Date | null
    category: string | null
    note: string | null
    amount: Decimal | null
    paymentMethod: string | null
    reference: string | null
    createdAt: Date | null
  }

  export type ExpenseMaxAggregateOutputType = {
    id: number | null
    expenseDate: Date | null
    category: string | null
    note: string | null
    amount: Decimal | null
    paymentMethod: string | null
    reference: string | null
    createdAt: Date | null
  }

  export type ExpenseCountAggregateOutputType = {
    id: number
    expenseDate: number
    category: number
    note: number
    amount: number
    paymentMethod: number
    reference: number
    createdAt: number
    _all: number
  }


  export type ExpenseAvgAggregateInputType = {
    id?: true
    amount?: true
  }

  export type ExpenseSumAggregateInputType = {
    id?: true
    amount?: true
  }

  export type ExpenseMinAggregateInputType = {
    id?: true
    expenseDate?: true
    category?: true
    note?: true
    amount?: true
    paymentMethod?: true
    reference?: true
    createdAt?: true
  }

  export type ExpenseMaxAggregateInputType = {
    id?: true
    expenseDate?: true
    category?: true
    note?: true
    amount?: true
    paymentMethod?: true
    reference?: true
    createdAt?: true
  }

  export type ExpenseCountAggregateInputType = {
    id?: true
    expenseDate?: true
    category?: true
    note?: true
    amount?: true
    paymentMethod?: true
    reference?: true
    createdAt?: true
    _all?: true
  }

  export type ExpenseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Expense to aggregate.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Expenses
    **/
    _count?: true | ExpenseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExpenseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExpenseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExpenseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExpenseMaxAggregateInputType
  }

  export type GetExpenseAggregateType<T extends ExpenseAggregateArgs> = {
        [P in keyof T & keyof AggregateExpense]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExpense[P]>
      : GetScalarType<T[P], AggregateExpense[P]>
  }




  export type ExpenseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseWhereInput
    orderBy?: ExpenseOrderByWithAggregationInput | ExpenseOrderByWithAggregationInput[]
    by: ExpenseScalarFieldEnum[] | ExpenseScalarFieldEnum
    having?: ExpenseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExpenseCountAggregateInputType | true
    _avg?: ExpenseAvgAggregateInputType
    _sum?: ExpenseSumAggregateInputType
    _min?: ExpenseMinAggregateInputType
    _max?: ExpenseMaxAggregateInputType
  }

  export type ExpenseGroupByOutputType = {
    id: number
    expenseDate: Date
    category: string
    note: string
    amount: Decimal
    paymentMethod: string
    reference: string | null
    createdAt: Date
    _count: ExpenseCountAggregateOutputType | null
    _avg: ExpenseAvgAggregateOutputType | null
    _sum: ExpenseSumAggregateOutputType | null
    _min: ExpenseMinAggregateOutputType | null
    _max: ExpenseMaxAggregateOutputType | null
  }

  type GetExpenseGroupByPayload<T extends ExpenseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExpenseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExpenseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExpenseGroupByOutputType[P]>
            : GetScalarType<T[P], ExpenseGroupByOutputType[P]>
        }
      >
    >


  export type ExpenseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expenseDate?: boolean
    category?: boolean
    note?: boolean
    amount?: boolean
    paymentMethod?: boolean
    reference?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["expense"]>

  export type ExpenseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expenseDate?: boolean
    category?: boolean
    note?: boolean
    amount?: boolean
    paymentMethod?: boolean
    reference?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["expense"]>

  export type ExpenseSelectScalar = {
    id?: boolean
    expenseDate?: boolean
    category?: boolean
    note?: boolean
    amount?: boolean
    paymentMethod?: boolean
    reference?: boolean
    createdAt?: boolean
  }


  export type $ExpensePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Expense"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      expenseDate: Date
      category: string
      note: string
      amount: Prisma.Decimal
      paymentMethod: string
      reference: string | null
      createdAt: Date
    }, ExtArgs["result"]["expense"]>
    composites: {}
  }

  type ExpenseGetPayload<S extends boolean | null | undefined | ExpenseDefaultArgs> = $Result.GetResult<Prisma.$ExpensePayload, S>

  type ExpenseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ExpenseFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ExpenseCountAggregateInputType | true
    }

  export interface ExpenseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Expense'], meta: { name: 'Expense' } }
    /**
     * Find zero or one Expense that matches the filter.
     * @param {ExpenseFindUniqueArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExpenseFindUniqueArgs>(args: SelectSubset<T, ExpenseFindUniqueArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Expense that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ExpenseFindUniqueOrThrowArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExpenseFindUniqueOrThrowArgs>(args: SelectSubset<T, ExpenseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Expense that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseFindFirstArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExpenseFindFirstArgs>(args?: SelectSubset<T, ExpenseFindFirstArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Expense that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseFindFirstOrThrowArgs} args - Arguments to find a Expense
     * @example
     * // Get one Expense
     * const expense = await prisma.expense.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExpenseFindFirstOrThrowArgs>(args?: SelectSubset<T, ExpenseFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Expenses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Expenses
     * const expenses = await prisma.expense.findMany()
     * 
     * // Get first 10 Expenses
     * const expenses = await prisma.expense.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const expenseWithIdOnly = await prisma.expense.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExpenseFindManyArgs>(args?: SelectSubset<T, ExpenseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Expense.
     * @param {ExpenseCreateArgs} args - Arguments to create a Expense.
     * @example
     * // Create one Expense
     * const Expense = await prisma.expense.create({
     *   data: {
     *     // ... data to create a Expense
     *   }
     * })
     * 
     */
    create<T extends ExpenseCreateArgs>(args: SelectSubset<T, ExpenseCreateArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Expenses.
     * @param {ExpenseCreateManyArgs} args - Arguments to create many Expenses.
     * @example
     * // Create many Expenses
     * const expense = await prisma.expense.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExpenseCreateManyArgs>(args?: SelectSubset<T, ExpenseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Expenses and returns the data saved in the database.
     * @param {ExpenseCreateManyAndReturnArgs} args - Arguments to create many Expenses.
     * @example
     * // Create many Expenses
     * const expense = await prisma.expense.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Expenses and only return the `id`
     * const expenseWithIdOnly = await prisma.expense.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExpenseCreateManyAndReturnArgs>(args?: SelectSubset<T, ExpenseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Expense.
     * @param {ExpenseDeleteArgs} args - Arguments to delete one Expense.
     * @example
     * // Delete one Expense
     * const Expense = await prisma.expense.delete({
     *   where: {
     *     // ... filter to delete one Expense
     *   }
     * })
     * 
     */
    delete<T extends ExpenseDeleteArgs>(args: SelectSubset<T, ExpenseDeleteArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Expense.
     * @param {ExpenseUpdateArgs} args - Arguments to update one Expense.
     * @example
     * // Update one Expense
     * const expense = await prisma.expense.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExpenseUpdateArgs>(args: SelectSubset<T, ExpenseUpdateArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Expenses.
     * @param {ExpenseDeleteManyArgs} args - Arguments to filter Expenses to delete.
     * @example
     * // Delete a few Expenses
     * const { count } = await prisma.expense.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExpenseDeleteManyArgs>(args?: SelectSubset<T, ExpenseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Expenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Expenses
     * const expense = await prisma.expense.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExpenseUpdateManyArgs>(args: SelectSubset<T, ExpenseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Expense.
     * @param {ExpenseUpsertArgs} args - Arguments to update or create a Expense.
     * @example
     * // Update or create a Expense
     * const expense = await prisma.expense.upsert({
     *   create: {
     *     // ... data to create a Expense
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Expense we want to update
     *   }
     * })
     */
    upsert<T extends ExpenseUpsertArgs>(args: SelectSubset<T, ExpenseUpsertArgs<ExtArgs>>): Prisma__ExpenseClient<$Result.GetResult<Prisma.$ExpensePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Expenses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCountArgs} args - Arguments to filter Expenses to count.
     * @example
     * // Count the number of Expenses
     * const count = await prisma.expense.count({
     *   where: {
     *     // ... the filter for the Expenses we want to count
     *   }
     * })
    **/
    count<T extends ExpenseCountArgs>(
      args?: Subset<T, ExpenseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExpenseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Expense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ExpenseAggregateArgs>(args: Subset<T, ExpenseAggregateArgs>): Prisma.PrismaPromise<GetExpenseAggregateType<T>>

    /**
     * Group by Expense.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseGroupByArgs} args - Group by arguments.
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
      T extends ExpenseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExpenseGroupByArgs['orderBy'] }
        : { orderBy?: ExpenseGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ExpenseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExpenseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Expense model
   */
  readonly fields: ExpenseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Expense.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExpenseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Expense model
   */ 
  interface ExpenseFieldRefs {
    readonly id: FieldRef<"Expense", 'Int'>
    readonly expenseDate: FieldRef<"Expense", 'DateTime'>
    readonly category: FieldRef<"Expense", 'String'>
    readonly note: FieldRef<"Expense", 'String'>
    readonly amount: FieldRef<"Expense", 'Decimal'>
    readonly paymentMethod: FieldRef<"Expense", 'String'>
    readonly reference: FieldRef<"Expense", 'String'>
    readonly createdAt: FieldRef<"Expense", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Expense findUnique
   */
  export type ExpenseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense findUniqueOrThrow
   */
  export type ExpenseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense findFirst
   */
  export type ExpenseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Expenses.
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Expenses.
     */
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * Expense findFirstOrThrow
   */
  export type ExpenseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Filter, which Expense to fetch.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Expenses.
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Expenses.
     */
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * Expense findMany
   */
  export type ExpenseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Filter, which Expenses to fetch.
     */
    where?: ExpenseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Expenses to fetch.
     */
    orderBy?: ExpenseOrderByWithRelationInput | ExpenseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Expenses.
     */
    cursor?: ExpenseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Expenses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Expenses.
     */
    skip?: number
    distinct?: ExpenseScalarFieldEnum | ExpenseScalarFieldEnum[]
  }

  /**
   * Expense create
   */
  export type ExpenseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * The data needed to create a Expense.
     */
    data: XOR<ExpenseCreateInput, ExpenseUncheckedCreateInput>
  }

  /**
   * Expense createMany
   */
  export type ExpenseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Expenses.
     */
    data: ExpenseCreateManyInput | ExpenseCreateManyInput[]
  }

  /**
   * Expense createManyAndReturn
   */
  export type ExpenseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Expenses.
     */
    data: ExpenseCreateManyInput | ExpenseCreateManyInput[]
  }

  /**
   * Expense update
   */
  export type ExpenseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * The data needed to update a Expense.
     */
    data: XOR<ExpenseUpdateInput, ExpenseUncheckedUpdateInput>
    /**
     * Choose, which Expense to update.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense updateMany
   */
  export type ExpenseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Expenses.
     */
    data: XOR<ExpenseUpdateManyMutationInput, ExpenseUncheckedUpdateManyInput>
    /**
     * Filter which Expenses to update
     */
    where?: ExpenseWhereInput
  }

  /**
   * Expense upsert
   */
  export type ExpenseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * The filter to search for the Expense to update in case it exists.
     */
    where: ExpenseWhereUniqueInput
    /**
     * In case the Expense found by the `where` argument doesn't exist, create a new Expense with this data.
     */
    create: XOR<ExpenseCreateInput, ExpenseUncheckedCreateInput>
    /**
     * In case the Expense was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExpenseUpdateInput, ExpenseUncheckedUpdateInput>
  }

  /**
   * Expense delete
   */
  export type ExpenseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
    /**
     * Filter which Expense to delete.
     */
    where: ExpenseWhereUniqueInput
  }

  /**
   * Expense deleteMany
   */
  export type ExpenseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Expenses to delete
     */
    where?: ExpenseWhereInput
  }

  /**
   * Expense without action
   */
  export type ExpenseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Expense
     */
    select?: ExpenseSelect<ExtArgs> | null
  }


  /**
   * Model Supplier
   */

  export type AggregateSupplier = {
    _count: SupplierCountAggregateOutputType | null
    _avg: SupplierAvgAggregateOutputType | null
    _sum: SupplierSumAggregateOutputType | null
    _min: SupplierMinAggregateOutputType | null
    _max: SupplierMaxAggregateOutputType | null
  }

  export type SupplierAvgAggregateOutputType = {
    id: number | null
  }

  export type SupplierSumAggregateOutputType = {
    id: number | null
  }

  export type SupplierMinAggregateOutputType = {
    id: number | null
    name: string | null
    phone: string | null
    email: string | null
    address: string | null
    notes: string | null
    createdAt: Date | null
  }

  export type SupplierMaxAggregateOutputType = {
    id: number | null
    name: string | null
    phone: string | null
    email: string | null
    address: string | null
    notes: string | null
    createdAt: Date | null
  }

  export type SupplierCountAggregateOutputType = {
    id: number
    name: number
    phone: number
    email: number
    address: number
    notes: number
    createdAt: number
    _all: number
  }


  export type SupplierAvgAggregateInputType = {
    id?: true
  }

  export type SupplierSumAggregateInputType = {
    id?: true
  }

  export type SupplierMinAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    email?: true
    address?: true
    notes?: true
    createdAt?: true
  }

  export type SupplierMaxAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    email?: true
    address?: true
    notes?: true
    createdAt?: true
  }

  export type SupplierCountAggregateInputType = {
    id?: true
    name?: true
    phone?: true
    email?: true
    address?: true
    notes?: true
    createdAt?: true
    _all?: true
  }

  export type SupplierAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Supplier to aggregate.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Suppliers
    **/
    _count?: true | SupplierCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SupplierAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SupplierSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SupplierMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SupplierMaxAggregateInputType
  }

  export type GetSupplierAggregateType<T extends SupplierAggregateArgs> = {
        [P in keyof T & keyof AggregateSupplier]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSupplier[P]>
      : GetScalarType<T[P], AggregateSupplier[P]>
  }




  export type SupplierGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SupplierWhereInput
    orderBy?: SupplierOrderByWithAggregationInput | SupplierOrderByWithAggregationInput[]
    by: SupplierScalarFieldEnum[] | SupplierScalarFieldEnum
    having?: SupplierScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SupplierCountAggregateInputType | true
    _avg?: SupplierAvgAggregateInputType
    _sum?: SupplierSumAggregateInputType
    _min?: SupplierMinAggregateInputType
    _max?: SupplierMaxAggregateInputType
  }

  export type SupplierGroupByOutputType = {
    id: number
    name: string
    phone: string | null
    email: string | null
    address: string | null
    notes: string | null
    createdAt: Date
    _count: SupplierCountAggregateOutputType | null
    _avg: SupplierAvgAggregateOutputType | null
    _sum: SupplierSumAggregateOutputType | null
    _min: SupplierMinAggregateOutputType | null
    _max: SupplierMaxAggregateOutputType | null
  }

  type GetSupplierGroupByPayload<T extends SupplierGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SupplierGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SupplierGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SupplierGroupByOutputType[P]>
            : GetScalarType<T[P], SupplierGroupByOutputType[P]>
        }
      >
    >


  export type SupplierSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    notes?: boolean
    createdAt?: boolean
    purchases?: boolean | Supplier$purchasesArgs<ExtArgs>
    _count?: boolean | SupplierCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["supplier"]>

  export type SupplierSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    notes?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["supplier"]>

  export type SupplierSelectScalar = {
    id?: boolean
    name?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    notes?: boolean
    createdAt?: boolean
  }

  export type SupplierInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    purchases?: boolean | Supplier$purchasesArgs<ExtArgs>
    _count?: boolean | SupplierCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SupplierIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SupplierPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Supplier"
    objects: {
      purchases: Prisma.$PurchasePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      phone: string | null
      email: string | null
      address: string | null
      notes: string | null
      createdAt: Date
    }, ExtArgs["result"]["supplier"]>
    composites: {}
  }

  type SupplierGetPayload<S extends boolean | null | undefined | SupplierDefaultArgs> = $Result.GetResult<Prisma.$SupplierPayload, S>

  type SupplierCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SupplierFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SupplierCountAggregateInputType | true
    }

  export interface SupplierDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Supplier'], meta: { name: 'Supplier' } }
    /**
     * Find zero or one Supplier that matches the filter.
     * @param {SupplierFindUniqueArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SupplierFindUniqueArgs>(args: SelectSubset<T, SupplierFindUniqueArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Supplier that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SupplierFindUniqueOrThrowArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SupplierFindUniqueOrThrowArgs>(args: SelectSubset<T, SupplierFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Supplier that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierFindFirstArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SupplierFindFirstArgs>(args?: SelectSubset<T, SupplierFindFirstArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Supplier that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierFindFirstOrThrowArgs} args - Arguments to find a Supplier
     * @example
     * // Get one Supplier
     * const supplier = await prisma.supplier.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SupplierFindFirstOrThrowArgs>(args?: SelectSubset<T, SupplierFindFirstOrThrowArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Suppliers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Suppliers
     * const suppliers = await prisma.supplier.findMany()
     * 
     * // Get first 10 Suppliers
     * const suppliers = await prisma.supplier.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const supplierWithIdOnly = await prisma.supplier.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SupplierFindManyArgs>(args?: SelectSubset<T, SupplierFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Supplier.
     * @param {SupplierCreateArgs} args - Arguments to create a Supplier.
     * @example
     * // Create one Supplier
     * const Supplier = await prisma.supplier.create({
     *   data: {
     *     // ... data to create a Supplier
     *   }
     * })
     * 
     */
    create<T extends SupplierCreateArgs>(args: SelectSubset<T, SupplierCreateArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Suppliers.
     * @param {SupplierCreateManyArgs} args - Arguments to create many Suppliers.
     * @example
     * // Create many Suppliers
     * const supplier = await prisma.supplier.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SupplierCreateManyArgs>(args?: SelectSubset<T, SupplierCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Suppliers and returns the data saved in the database.
     * @param {SupplierCreateManyAndReturnArgs} args - Arguments to create many Suppliers.
     * @example
     * // Create many Suppliers
     * const supplier = await prisma.supplier.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Suppliers and only return the `id`
     * const supplierWithIdOnly = await prisma.supplier.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SupplierCreateManyAndReturnArgs>(args?: SelectSubset<T, SupplierCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Supplier.
     * @param {SupplierDeleteArgs} args - Arguments to delete one Supplier.
     * @example
     * // Delete one Supplier
     * const Supplier = await prisma.supplier.delete({
     *   where: {
     *     // ... filter to delete one Supplier
     *   }
     * })
     * 
     */
    delete<T extends SupplierDeleteArgs>(args: SelectSubset<T, SupplierDeleteArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Supplier.
     * @param {SupplierUpdateArgs} args - Arguments to update one Supplier.
     * @example
     * // Update one Supplier
     * const supplier = await prisma.supplier.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SupplierUpdateArgs>(args: SelectSubset<T, SupplierUpdateArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Suppliers.
     * @param {SupplierDeleteManyArgs} args - Arguments to filter Suppliers to delete.
     * @example
     * // Delete a few Suppliers
     * const { count } = await prisma.supplier.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SupplierDeleteManyArgs>(args?: SelectSubset<T, SupplierDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Suppliers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Suppliers
     * const supplier = await prisma.supplier.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SupplierUpdateManyArgs>(args: SelectSubset<T, SupplierUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Supplier.
     * @param {SupplierUpsertArgs} args - Arguments to update or create a Supplier.
     * @example
     * // Update or create a Supplier
     * const supplier = await prisma.supplier.upsert({
     *   create: {
     *     // ... data to create a Supplier
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Supplier we want to update
     *   }
     * })
     */
    upsert<T extends SupplierUpsertArgs>(args: SelectSubset<T, SupplierUpsertArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Suppliers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierCountArgs} args - Arguments to filter Suppliers to count.
     * @example
     * // Count the number of Suppliers
     * const count = await prisma.supplier.count({
     *   where: {
     *     // ... the filter for the Suppliers we want to count
     *   }
     * })
    **/
    count<T extends SupplierCountArgs>(
      args?: Subset<T, SupplierCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SupplierCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Supplier.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SupplierAggregateArgs>(args: Subset<T, SupplierAggregateArgs>): Prisma.PrismaPromise<GetSupplierAggregateType<T>>

    /**
     * Group by Supplier.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SupplierGroupByArgs} args - Group by arguments.
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
      T extends SupplierGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SupplierGroupByArgs['orderBy'] }
        : { orderBy?: SupplierGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SupplierGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSupplierGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Supplier model
   */
  readonly fields: SupplierFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Supplier.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SupplierClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    purchases<T extends Supplier$purchasesArgs<ExtArgs> = {}>(args?: Subset<T, Supplier$purchasesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Supplier model
   */ 
  interface SupplierFieldRefs {
    readonly id: FieldRef<"Supplier", 'Int'>
    readonly name: FieldRef<"Supplier", 'String'>
    readonly phone: FieldRef<"Supplier", 'String'>
    readonly email: FieldRef<"Supplier", 'String'>
    readonly address: FieldRef<"Supplier", 'String'>
    readonly notes: FieldRef<"Supplier", 'String'>
    readonly createdAt: FieldRef<"Supplier", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Supplier findUnique
   */
  export type SupplierFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier findUniqueOrThrow
   */
  export type SupplierFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier findFirst
   */
  export type SupplierFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Suppliers.
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Suppliers.
     */
    distinct?: SupplierScalarFieldEnum | SupplierScalarFieldEnum[]
  }

  /**
   * Supplier findFirstOrThrow
   */
  export type SupplierFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Supplier to fetch.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Suppliers.
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Suppliers.
     */
    distinct?: SupplierScalarFieldEnum | SupplierScalarFieldEnum[]
  }

  /**
   * Supplier findMany
   */
  export type SupplierFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter, which Suppliers to fetch.
     */
    where?: SupplierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suppliers to fetch.
     */
    orderBy?: SupplierOrderByWithRelationInput | SupplierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Suppliers.
     */
    cursor?: SupplierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suppliers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suppliers.
     */
    skip?: number
    distinct?: SupplierScalarFieldEnum | SupplierScalarFieldEnum[]
  }

  /**
   * Supplier create
   */
  export type SupplierCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * The data needed to create a Supplier.
     */
    data: XOR<SupplierCreateInput, SupplierUncheckedCreateInput>
  }

  /**
   * Supplier createMany
   */
  export type SupplierCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Suppliers.
     */
    data: SupplierCreateManyInput | SupplierCreateManyInput[]
  }

  /**
   * Supplier createManyAndReturn
   */
  export type SupplierCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Suppliers.
     */
    data: SupplierCreateManyInput | SupplierCreateManyInput[]
  }

  /**
   * Supplier update
   */
  export type SupplierUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * The data needed to update a Supplier.
     */
    data: XOR<SupplierUpdateInput, SupplierUncheckedUpdateInput>
    /**
     * Choose, which Supplier to update.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier updateMany
   */
  export type SupplierUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Suppliers.
     */
    data: XOR<SupplierUpdateManyMutationInput, SupplierUncheckedUpdateManyInput>
    /**
     * Filter which Suppliers to update
     */
    where?: SupplierWhereInput
  }

  /**
   * Supplier upsert
   */
  export type SupplierUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * The filter to search for the Supplier to update in case it exists.
     */
    where: SupplierWhereUniqueInput
    /**
     * In case the Supplier found by the `where` argument doesn't exist, create a new Supplier with this data.
     */
    create: XOR<SupplierCreateInput, SupplierUncheckedCreateInput>
    /**
     * In case the Supplier was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SupplierUpdateInput, SupplierUncheckedUpdateInput>
  }

  /**
   * Supplier delete
   */
  export type SupplierDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
    /**
     * Filter which Supplier to delete.
     */
    where: SupplierWhereUniqueInput
  }

  /**
   * Supplier deleteMany
   */
  export type SupplierDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Suppliers to delete
     */
    where?: SupplierWhereInput
  }

  /**
   * Supplier.purchases
   */
  export type Supplier$purchasesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    where?: PurchaseWhereInput
    orderBy?: PurchaseOrderByWithRelationInput | PurchaseOrderByWithRelationInput[]
    cursor?: PurchaseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PurchaseScalarFieldEnum | PurchaseScalarFieldEnum[]
  }

  /**
   * Supplier without action
   */
  export type SupplierDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Supplier
     */
    select?: SupplierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SupplierInclude<ExtArgs> | null
  }


  /**
   * Model Purchase
   */

  export type AggregatePurchase = {
    _count: PurchaseCountAggregateOutputType | null
    _avg: PurchaseAvgAggregateOutputType | null
    _sum: PurchaseSumAggregateOutputType | null
    _min: PurchaseMinAggregateOutputType | null
    _max: PurchaseMaxAggregateOutputType | null
  }

  export type PurchaseAvgAggregateOutputType = {
    id: number | null
    supplierId: number | null
    subtotal: Decimal | null
    taxAmount: Decimal | null
    discountAmount: Decimal | null
    totalAmount: Decimal | null
    paidAmount: Decimal | null
  }

  export type PurchaseSumAggregateOutputType = {
    id: number | null
    supplierId: number | null
    subtotal: Decimal | null
    taxAmount: Decimal | null
    discountAmount: Decimal | null
    totalAmount: Decimal | null
    paidAmount: Decimal | null
  }

  export type PurchaseMinAggregateOutputType = {
    id: number | null
    supplierId: number | null
    purchaseDate: Date | null
    invoiceNumber: string | null
    paymentStatus: string | null
    subtotal: Decimal | null
    taxAmount: Decimal | null
    discountAmount: Decimal | null
    totalAmount: Decimal | null
    paidAmount: Decimal | null
    note: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PurchaseMaxAggregateOutputType = {
    id: number | null
    supplierId: number | null
    purchaseDate: Date | null
    invoiceNumber: string | null
    paymentStatus: string | null
    subtotal: Decimal | null
    taxAmount: Decimal | null
    discountAmount: Decimal | null
    totalAmount: Decimal | null
    paidAmount: Decimal | null
    note: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PurchaseCountAggregateOutputType = {
    id: number
    supplierId: number
    purchaseDate: number
    invoiceNumber: number
    paymentStatus: number
    subtotal: number
    taxAmount: number
    discountAmount: number
    totalAmount: number
    paidAmount: number
    note: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PurchaseAvgAggregateInputType = {
    id?: true
    supplierId?: true
    subtotal?: true
    taxAmount?: true
    discountAmount?: true
    totalAmount?: true
    paidAmount?: true
  }

  export type PurchaseSumAggregateInputType = {
    id?: true
    supplierId?: true
    subtotal?: true
    taxAmount?: true
    discountAmount?: true
    totalAmount?: true
    paidAmount?: true
  }

  export type PurchaseMinAggregateInputType = {
    id?: true
    supplierId?: true
    purchaseDate?: true
    invoiceNumber?: true
    paymentStatus?: true
    subtotal?: true
    taxAmount?: true
    discountAmount?: true
    totalAmount?: true
    paidAmount?: true
    note?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PurchaseMaxAggregateInputType = {
    id?: true
    supplierId?: true
    purchaseDate?: true
    invoiceNumber?: true
    paymentStatus?: true
    subtotal?: true
    taxAmount?: true
    discountAmount?: true
    totalAmount?: true
    paidAmount?: true
    note?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PurchaseCountAggregateInputType = {
    id?: true
    supplierId?: true
    purchaseDate?: true
    invoiceNumber?: true
    paymentStatus?: true
    subtotal?: true
    taxAmount?: true
    discountAmount?: true
    totalAmount?: true
    paidAmount?: true
    note?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PurchaseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Purchase to aggregate.
     */
    where?: PurchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Purchases to fetch.
     */
    orderBy?: PurchaseOrderByWithRelationInput | PurchaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PurchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Purchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Purchases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Purchases
    **/
    _count?: true | PurchaseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PurchaseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PurchaseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PurchaseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PurchaseMaxAggregateInputType
  }

  export type GetPurchaseAggregateType<T extends PurchaseAggregateArgs> = {
        [P in keyof T & keyof AggregatePurchase]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePurchase[P]>
      : GetScalarType<T[P], AggregatePurchase[P]>
  }




  export type PurchaseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PurchaseWhereInput
    orderBy?: PurchaseOrderByWithAggregationInput | PurchaseOrderByWithAggregationInput[]
    by: PurchaseScalarFieldEnum[] | PurchaseScalarFieldEnum
    having?: PurchaseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PurchaseCountAggregateInputType | true
    _avg?: PurchaseAvgAggregateInputType
    _sum?: PurchaseSumAggregateInputType
    _min?: PurchaseMinAggregateInputType
    _max?: PurchaseMaxAggregateInputType
  }

  export type PurchaseGroupByOutputType = {
    id: number
    supplierId: number
    purchaseDate: Date
    invoiceNumber: string | null
    paymentStatus: string
    subtotal: Decimal
    taxAmount: Decimal
    discountAmount: Decimal
    totalAmount: Decimal
    paidAmount: Decimal
    note: string | null
    createdAt: Date
    updatedAt: Date
    _count: PurchaseCountAggregateOutputType | null
    _avg: PurchaseAvgAggregateOutputType | null
    _sum: PurchaseSumAggregateOutputType | null
    _min: PurchaseMinAggregateOutputType | null
    _max: PurchaseMaxAggregateOutputType | null
  }

  type GetPurchaseGroupByPayload<T extends PurchaseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PurchaseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PurchaseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PurchaseGroupByOutputType[P]>
            : GetScalarType<T[P], PurchaseGroupByOutputType[P]>
        }
      >
    >


  export type PurchaseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    supplierId?: boolean
    purchaseDate?: boolean
    invoiceNumber?: boolean
    paymentStatus?: boolean
    subtotal?: boolean
    taxAmount?: boolean
    discountAmount?: boolean
    totalAmount?: boolean
    paidAmount?: boolean
    note?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    supplier?: boolean | SupplierDefaultArgs<ExtArgs>
    items?: boolean | Purchase$itemsArgs<ExtArgs>
    _count?: boolean | PurchaseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["purchase"]>

  export type PurchaseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    supplierId?: boolean
    purchaseDate?: boolean
    invoiceNumber?: boolean
    paymentStatus?: boolean
    subtotal?: boolean
    taxAmount?: boolean
    discountAmount?: boolean
    totalAmount?: boolean
    paidAmount?: boolean
    note?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    supplier?: boolean | SupplierDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["purchase"]>

  export type PurchaseSelectScalar = {
    id?: boolean
    supplierId?: boolean
    purchaseDate?: boolean
    invoiceNumber?: boolean
    paymentStatus?: boolean
    subtotal?: boolean
    taxAmount?: boolean
    discountAmount?: boolean
    totalAmount?: boolean
    paidAmount?: boolean
    note?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PurchaseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    supplier?: boolean | SupplierDefaultArgs<ExtArgs>
    items?: boolean | Purchase$itemsArgs<ExtArgs>
    _count?: boolean | PurchaseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PurchaseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    supplier?: boolean | SupplierDefaultArgs<ExtArgs>
  }

  export type $PurchasePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Purchase"
    objects: {
      supplier: Prisma.$SupplierPayload<ExtArgs>
      items: Prisma.$PurchaseItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      supplierId: number
      purchaseDate: Date
      invoiceNumber: string | null
      paymentStatus: string
      subtotal: Prisma.Decimal
      taxAmount: Prisma.Decimal
      discountAmount: Prisma.Decimal
      totalAmount: Prisma.Decimal
      paidAmount: Prisma.Decimal
      note: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["purchase"]>
    composites: {}
  }

  type PurchaseGetPayload<S extends boolean | null | undefined | PurchaseDefaultArgs> = $Result.GetResult<Prisma.$PurchasePayload, S>

  type PurchaseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PurchaseFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PurchaseCountAggregateInputType | true
    }

  export interface PurchaseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Purchase'], meta: { name: 'Purchase' } }
    /**
     * Find zero or one Purchase that matches the filter.
     * @param {PurchaseFindUniqueArgs} args - Arguments to find a Purchase
     * @example
     * // Get one Purchase
     * const purchase = await prisma.purchase.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PurchaseFindUniqueArgs>(args: SelectSubset<T, PurchaseFindUniqueArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Purchase that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PurchaseFindUniqueOrThrowArgs} args - Arguments to find a Purchase
     * @example
     * // Get one Purchase
     * const purchase = await prisma.purchase.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PurchaseFindUniqueOrThrowArgs>(args: SelectSubset<T, PurchaseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Purchase that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseFindFirstArgs} args - Arguments to find a Purchase
     * @example
     * // Get one Purchase
     * const purchase = await prisma.purchase.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PurchaseFindFirstArgs>(args?: SelectSubset<T, PurchaseFindFirstArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Purchase that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseFindFirstOrThrowArgs} args - Arguments to find a Purchase
     * @example
     * // Get one Purchase
     * const purchase = await prisma.purchase.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PurchaseFindFirstOrThrowArgs>(args?: SelectSubset<T, PurchaseFindFirstOrThrowArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Purchases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Purchases
     * const purchases = await prisma.purchase.findMany()
     * 
     * // Get first 10 Purchases
     * const purchases = await prisma.purchase.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const purchaseWithIdOnly = await prisma.purchase.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PurchaseFindManyArgs>(args?: SelectSubset<T, PurchaseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Purchase.
     * @param {PurchaseCreateArgs} args - Arguments to create a Purchase.
     * @example
     * // Create one Purchase
     * const Purchase = await prisma.purchase.create({
     *   data: {
     *     // ... data to create a Purchase
     *   }
     * })
     * 
     */
    create<T extends PurchaseCreateArgs>(args: SelectSubset<T, PurchaseCreateArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Purchases.
     * @param {PurchaseCreateManyArgs} args - Arguments to create many Purchases.
     * @example
     * // Create many Purchases
     * const purchase = await prisma.purchase.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PurchaseCreateManyArgs>(args?: SelectSubset<T, PurchaseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Purchases and returns the data saved in the database.
     * @param {PurchaseCreateManyAndReturnArgs} args - Arguments to create many Purchases.
     * @example
     * // Create many Purchases
     * const purchase = await prisma.purchase.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Purchases and only return the `id`
     * const purchaseWithIdOnly = await prisma.purchase.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PurchaseCreateManyAndReturnArgs>(args?: SelectSubset<T, PurchaseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Purchase.
     * @param {PurchaseDeleteArgs} args - Arguments to delete one Purchase.
     * @example
     * // Delete one Purchase
     * const Purchase = await prisma.purchase.delete({
     *   where: {
     *     // ... filter to delete one Purchase
     *   }
     * })
     * 
     */
    delete<T extends PurchaseDeleteArgs>(args: SelectSubset<T, PurchaseDeleteArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Purchase.
     * @param {PurchaseUpdateArgs} args - Arguments to update one Purchase.
     * @example
     * // Update one Purchase
     * const purchase = await prisma.purchase.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PurchaseUpdateArgs>(args: SelectSubset<T, PurchaseUpdateArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Purchases.
     * @param {PurchaseDeleteManyArgs} args - Arguments to filter Purchases to delete.
     * @example
     * // Delete a few Purchases
     * const { count } = await prisma.purchase.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PurchaseDeleteManyArgs>(args?: SelectSubset<T, PurchaseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Purchases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Purchases
     * const purchase = await prisma.purchase.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PurchaseUpdateManyArgs>(args: SelectSubset<T, PurchaseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Purchase.
     * @param {PurchaseUpsertArgs} args - Arguments to update or create a Purchase.
     * @example
     * // Update or create a Purchase
     * const purchase = await prisma.purchase.upsert({
     *   create: {
     *     // ... data to create a Purchase
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Purchase we want to update
     *   }
     * })
     */
    upsert<T extends PurchaseUpsertArgs>(args: SelectSubset<T, PurchaseUpsertArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Purchases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseCountArgs} args - Arguments to filter Purchases to count.
     * @example
     * // Count the number of Purchases
     * const count = await prisma.purchase.count({
     *   where: {
     *     // ... the filter for the Purchases we want to count
     *   }
     * })
    **/
    count<T extends PurchaseCountArgs>(
      args?: Subset<T, PurchaseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PurchaseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Purchase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PurchaseAggregateArgs>(args: Subset<T, PurchaseAggregateArgs>): Prisma.PrismaPromise<GetPurchaseAggregateType<T>>

    /**
     * Group by Purchase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseGroupByArgs} args - Group by arguments.
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
      T extends PurchaseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PurchaseGroupByArgs['orderBy'] }
        : { orderBy?: PurchaseGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PurchaseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPurchaseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Purchase model
   */
  readonly fields: PurchaseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Purchase.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PurchaseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    supplier<T extends SupplierDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SupplierDefaultArgs<ExtArgs>>): Prisma__SupplierClient<$Result.GetResult<Prisma.$SupplierPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    items<T extends Purchase$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Purchase$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PurchaseItemPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Purchase model
   */ 
  interface PurchaseFieldRefs {
    readonly id: FieldRef<"Purchase", 'Int'>
    readonly supplierId: FieldRef<"Purchase", 'Int'>
    readonly purchaseDate: FieldRef<"Purchase", 'DateTime'>
    readonly invoiceNumber: FieldRef<"Purchase", 'String'>
    readonly paymentStatus: FieldRef<"Purchase", 'String'>
    readonly subtotal: FieldRef<"Purchase", 'Decimal'>
    readonly taxAmount: FieldRef<"Purchase", 'Decimal'>
    readonly discountAmount: FieldRef<"Purchase", 'Decimal'>
    readonly totalAmount: FieldRef<"Purchase", 'Decimal'>
    readonly paidAmount: FieldRef<"Purchase", 'Decimal'>
    readonly note: FieldRef<"Purchase", 'String'>
    readonly createdAt: FieldRef<"Purchase", 'DateTime'>
    readonly updatedAt: FieldRef<"Purchase", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Purchase findUnique
   */
  export type PurchaseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * Filter, which Purchase to fetch.
     */
    where: PurchaseWhereUniqueInput
  }

  /**
   * Purchase findUniqueOrThrow
   */
  export type PurchaseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * Filter, which Purchase to fetch.
     */
    where: PurchaseWhereUniqueInput
  }

  /**
   * Purchase findFirst
   */
  export type PurchaseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * Filter, which Purchase to fetch.
     */
    where?: PurchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Purchases to fetch.
     */
    orderBy?: PurchaseOrderByWithRelationInput | PurchaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Purchases.
     */
    cursor?: PurchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Purchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Purchases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Purchases.
     */
    distinct?: PurchaseScalarFieldEnum | PurchaseScalarFieldEnum[]
  }

  /**
   * Purchase findFirstOrThrow
   */
  export type PurchaseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * Filter, which Purchase to fetch.
     */
    where?: PurchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Purchases to fetch.
     */
    orderBy?: PurchaseOrderByWithRelationInput | PurchaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Purchases.
     */
    cursor?: PurchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Purchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Purchases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Purchases.
     */
    distinct?: PurchaseScalarFieldEnum | PurchaseScalarFieldEnum[]
  }

  /**
   * Purchase findMany
   */
  export type PurchaseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * Filter, which Purchases to fetch.
     */
    where?: PurchaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Purchases to fetch.
     */
    orderBy?: PurchaseOrderByWithRelationInput | PurchaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Purchases.
     */
    cursor?: PurchaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Purchases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Purchases.
     */
    skip?: number
    distinct?: PurchaseScalarFieldEnum | PurchaseScalarFieldEnum[]
  }

  /**
   * Purchase create
   */
  export type PurchaseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * The data needed to create a Purchase.
     */
    data: XOR<PurchaseCreateInput, PurchaseUncheckedCreateInput>
  }

  /**
   * Purchase createMany
   */
  export type PurchaseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Purchases.
     */
    data: PurchaseCreateManyInput | PurchaseCreateManyInput[]
  }

  /**
   * Purchase createManyAndReturn
   */
  export type PurchaseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Purchases.
     */
    data: PurchaseCreateManyInput | PurchaseCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Purchase update
   */
  export type PurchaseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * The data needed to update a Purchase.
     */
    data: XOR<PurchaseUpdateInput, PurchaseUncheckedUpdateInput>
    /**
     * Choose, which Purchase to update.
     */
    where: PurchaseWhereUniqueInput
  }

  /**
   * Purchase updateMany
   */
  export type PurchaseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Purchases.
     */
    data: XOR<PurchaseUpdateManyMutationInput, PurchaseUncheckedUpdateManyInput>
    /**
     * Filter which Purchases to update
     */
    where?: PurchaseWhereInput
  }

  /**
   * Purchase upsert
   */
  export type PurchaseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * The filter to search for the Purchase to update in case it exists.
     */
    where: PurchaseWhereUniqueInput
    /**
     * In case the Purchase found by the `where` argument doesn't exist, create a new Purchase with this data.
     */
    create: XOR<PurchaseCreateInput, PurchaseUncheckedCreateInput>
    /**
     * In case the Purchase was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PurchaseUpdateInput, PurchaseUncheckedUpdateInput>
  }

  /**
   * Purchase delete
   */
  export type PurchaseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
    /**
     * Filter which Purchase to delete.
     */
    where: PurchaseWhereUniqueInput
  }

  /**
   * Purchase deleteMany
   */
  export type PurchaseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Purchases to delete
     */
    where?: PurchaseWhereInput
  }

  /**
   * Purchase.items
   */
  export type Purchase$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseItem
     */
    select?: PurchaseItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseItemInclude<ExtArgs> | null
    where?: PurchaseItemWhereInput
    orderBy?: PurchaseItemOrderByWithRelationInput | PurchaseItemOrderByWithRelationInput[]
    cursor?: PurchaseItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PurchaseItemScalarFieldEnum | PurchaseItemScalarFieldEnum[]
  }

  /**
   * Purchase without action
   */
  export type PurchaseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Purchase
     */
    select?: PurchaseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseInclude<ExtArgs> | null
  }


  /**
   * Model PurchaseItem
   */

  export type AggregatePurchaseItem = {
    _count: PurchaseItemCountAggregateOutputType | null
    _avg: PurchaseItemAvgAggregateOutputType | null
    _sum: PurchaseItemSumAggregateOutputType | null
    _min: PurchaseItemMinAggregateOutputType | null
    _max: PurchaseItemMaxAggregateOutputType | null
  }

  export type PurchaseItemAvgAggregateOutputType = {
    id: number | null
    purchaseId: number | null
    quantity: Decimal | null
    unitPrice: Decimal | null
    totalPrice: Decimal | null
  }

  export type PurchaseItemSumAggregateOutputType = {
    id: number | null
    purchaseId: number | null
    quantity: Decimal | null
    unitPrice: Decimal | null
    totalPrice: Decimal | null
  }

  export type PurchaseItemMinAggregateOutputType = {
    id: number | null
    purchaseId: number | null
    itemName: string | null
    quantity: Decimal | null
    unit: string | null
    unitPrice: Decimal | null
    totalPrice: Decimal | null
    createdAt: Date | null
  }

  export type PurchaseItemMaxAggregateOutputType = {
    id: number | null
    purchaseId: number | null
    itemName: string | null
    quantity: Decimal | null
    unit: string | null
    unitPrice: Decimal | null
    totalPrice: Decimal | null
    createdAt: Date | null
  }

  export type PurchaseItemCountAggregateOutputType = {
    id: number
    purchaseId: number
    itemName: number
    quantity: number
    unit: number
    unitPrice: number
    totalPrice: number
    createdAt: number
    _all: number
  }


  export type PurchaseItemAvgAggregateInputType = {
    id?: true
    purchaseId?: true
    quantity?: true
    unitPrice?: true
    totalPrice?: true
  }

  export type PurchaseItemSumAggregateInputType = {
    id?: true
    purchaseId?: true
    quantity?: true
    unitPrice?: true
    totalPrice?: true
  }

  export type PurchaseItemMinAggregateInputType = {
    id?: true
    purchaseId?: true
    itemName?: true
    quantity?: true
    unit?: true
    unitPrice?: true
    totalPrice?: true
    createdAt?: true
  }

  export type PurchaseItemMaxAggregateInputType = {
    id?: true
    purchaseId?: true
    itemName?: true
    quantity?: true
    unit?: true
    unitPrice?: true
    totalPrice?: true
    createdAt?: true
  }

  export type PurchaseItemCountAggregateInputType = {
    id?: true
    purchaseId?: true
    itemName?: true
    quantity?: true
    unit?: true
    unitPrice?: true
    totalPrice?: true
    createdAt?: true
    _all?: true
  }

  export type PurchaseItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PurchaseItem to aggregate.
     */
    where?: PurchaseItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PurchaseItems to fetch.
     */
    orderBy?: PurchaseItemOrderByWithRelationInput | PurchaseItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PurchaseItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PurchaseItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PurchaseItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PurchaseItems
    **/
    _count?: true | PurchaseItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PurchaseItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PurchaseItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PurchaseItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PurchaseItemMaxAggregateInputType
  }

  export type GetPurchaseItemAggregateType<T extends PurchaseItemAggregateArgs> = {
        [P in keyof T & keyof AggregatePurchaseItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePurchaseItem[P]>
      : GetScalarType<T[P], AggregatePurchaseItem[P]>
  }




  export type PurchaseItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PurchaseItemWhereInput
    orderBy?: PurchaseItemOrderByWithAggregationInput | PurchaseItemOrderByWithAggregationInput[]
    by: PurchaseItemScalarFieldEnum[] | PurchaseItemScalarFieldEnum
    having?: PurchaseItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PurchaseItemCountAggregateInputType | true
    _avg?: PurchaseItemAvgAggregateInputType
    _sum?: PurchaseItemSumAggregateInputType
    _min?: PurchaseItemMinAggregateInputType
    _max?: PurchaseItemMaxAggregateInputType
  }

  export type PurchaseItemGroupByOutputType = {
    id: number
    purchaseId: number
    itemName: string
    quantity: Decimal
    unit: string | null
    unitPrice: Decimal
    totalPrice: Decimal
    createdAt: Date
    _count: PurchaseItemCountAggregateOutputType | null
    _avg: PurchaseItemAvgAggregateOutputType | null
    _sum: PurchaseItemSumAggregateOutputType | null
    _min: PurchaseItemMinAggregateOutputType | null
    _max: PurchaseItemMaxAggregateOutputType | null
  }

  type GetPurchaseItemGroupByPayload<T extends PurchaseItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PurchaseItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PurchaseItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PurchaseItemGroupByOutputType[P]>
            : GetScalarType<T[P], PurchaseItemGroupByOutputType[P]>
        }
      >
    >


  export type PurchaseItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    purchaseId?: boolean
    itemName?: boolean
    quantity?: boolean
    unit?: boolean
    unitPrice?: boolean
    totalPrice?: boolean
    createdAt?: boolean
    purchase?: boolean | PurchaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["purchaseItem"]>

  export type PurchaseItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    purchaseId?: boolean
    itemName?: boolean
    quantity?: boolean
    unit?: boolean
    unitPrice?: boolean
    totalPrice?: boolean
    createdAt?: boolean
    purchase?: boolean | PurchaseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["purchaseItem"]>

  export type PurchaseItemSelectScalar = {
    id?: boolean
    purchaseId?: boolean
    itemName?: boolean
    quantity?: boolean
    unit?: boolean
    unitPrice?: boolean
    totalPrice?: boolean
    createdAt?: boolean
  }

  export type PurchaseItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    purchase?: boolean | PurchaseDefaultArgs<ExtArgs>
  }
  export type PurchaseItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    purchase?: boolean | PurchaseDefaultArgs<ExtArgs>
  }

  export type $PurchaseItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PurchaseItem"
    objects: {
      purchase: Prisma.$PurchasePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      purchaseId: number
      itemName: string
      quantity: Prisma.Decimal
      unit: string | null
      unitPrice: Prisma.Decimal
      totalPrice: Prisma.Decimal
      createdAt: Date
    }, ExtArgs["result"]["purchaseItem"]>
    composites: {}
  }

  type PurchaseItemGetPayload<S extends boolean | null | undefined | PurchaseItemDefaultArgs> = $Result.GetResult<Prisma.$PurchaseItemPayload, S>

  type PurchaseItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PurchaseItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PurchaseItemCountAggregateInputType | true
    }

  export interface PurchaseItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PurchaseItem'], meta: { name: 'PurchaseItem' } }
    /**
     * Find zero or one PurchaseItem that matches the filter.
     * @param {PurchaseItemFindUniqueArgs} args - Arguments to find a PurchaseItem
     * @example
     * // Get one PurchaseItem
     * const purchaseItem = await prisma.purchaseItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PurchaseItemFindUniqueArgs>(args: SelectSubset<T, PurchaseItemFindUniqueArgs<ExtArgs>>): Prisma__PurchaseItemClient<$Result.GetResult<Prisma.$PurchaseItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PurchaseItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PurchaseItemFindUniqueOrThrowArgs} args - Arguments to find a PurchaseItem
     * @example
     * // Get one PurchaseItem
     * const purchaseItem = await prisma.purchaseItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PurchaseItemFindUniqueOrThrowArgs>(args: SelectSubset<T, PurchaseItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PurchaseItemClient<$Result.GetResult<Prisma.$PurchaseItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PurchaseItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseItemFindFirstArgs} args - Arguments to find a PurchaseItem
     * @example
     * // Get one PurchaseItem
     * const purchaseItem = await prisma.purchaseItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PurchaseItemFindFirstArgs>(args?: SelectSubset<T, PurchaseItemFindFirstArgs<ExtArgs>>): Prisma__PurchaseItemClient<$Result.GetResult<Prisma.$PurchaseItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PurchaseItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseItemFindFirstOrThrowArgs} args - Arguments to find a PurchaseItem
     * @example
     * // Get one PurchaseItem
     * const purchaseItem = await prisma.purchaseItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PurchaseItemFindFirstOrThrowArgs>(args?: SelectSubset<T, PurchaseItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__PurchaseItemClient<$Result.GetResult<Prisma.$PurchaseItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PurchaseItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PurchaseItems
     * const purchaseItems = await prisma.purchaseItem.findMany()
     * 
     * // Get first 10 PurchaseItems
     * const purchaseItems = await prisma.purchaseItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const purchaseItemWithIdOnly = await prisma.purchaseItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PurchaseItemFindManyArgs>(args?: SelectSubset<T, PurchaseItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PurchaseItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PurchaseItem.
     * @param {PurchaseItemCreateArgs} args - Arguments to create a PurchaseItem.
     * @example
     * // Create one PurchaseItem
     * const PurchaseItem = await prisma.purchaseItem.create({
     *   data: {
     *     // ... data to create a PurchaseItem
     *   }
     * })
     * 
     */
    create<T extends PurchaseItemCreateArgs>(args: SelectSubset<T, PurchaseItemCreateArgs<ExtArgs>>): Prisma__PurchaseItemClient<$Result.GetResult<Prisma.$PurchaseItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PurchaseItems.
     * @param {PurchaseItemCreateManyArgs} args - Arguments to create many PurchaseItems.
     * @example
     * // Create many PurchaseItems
     * const purchaseItem = await prisma.purchaseItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PurchaseItemCreateManyArgs>(args?: SelectSubset<T, PurchaseItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PurchaseItems and returns the data saved in the database.
     * @param {PurchaseItemCreateManyAndReturnArgs} args - Arguments to create many PurchaseItems.
     * @example
     * // Create many PurchaseItems
     * const purchaseItem = await prisma.purchaseItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PurchaseItems and only return the `id`
     * const purchaseItemWithIdOnly = await prisma.purchaseItem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PurchaseItemCreateManyAndReturnArgs>(args?: SelectSubset<T, PurchaseItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PurchaseItemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PurchaseItem.
     * @param {PurchaseItemDeleteArgs} args - Arguments to delete one PurchaseItem.
     * @example
     * // Delete one PurchaseItem
     * const PurchaseItem = await prisma.purchaseItem.delete({
     *   where: {
     *     // ... filter to delete one PurchaseItem
     *   }
     * })
     * 
     */
    delete<T extends PurchaseItemDeleteArgs>(args: SelectSubset<T, PurchaseItemDeleteArgs<ExtArgs>>): Prisma__PurchaseItemClient<$Result.GetResult<Prisma.$PurchaseItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PurchaseItem.
     * @param {PurchaseItemUpdateArgs} args - Arguments to update one PurchaseItem.
     * @example
     * // Update one PurchaseItem
     * const purchaseItem = await prisma.purchaseItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PurchaseItemUpdateArgs>(args: SelectSubset<T, PurchaseItemUpdateArgs<ExtArgs>>): Prisma__PurchaseItemClient<$Result.GetResult<Prisma.$PurchaseItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PurchaseItems.
     * @param {PurchaseItemDeleteManyArgs} args - Arguments to filter PurchaseItems to delete.
     * @example
     * // Delete a few PurchaseItems
     * const { count } = await prisma.purchaseItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PurchaseItemDeleteManyArgs>(args?: SelectSubset<T, PurchaseItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PurchaseItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PurchaseItems
     * const purchaseItem = await prisma.purchaseItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PurchaseItemUpdateManyArgs>(args: SelectSubset<T, PurchaseItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PurchaseItem.
     * @param {PurchaseItemUpsertArgs} args - Arguments to update or create a PurchaseItem.
     * @example
     * // Update or create a PurchaseItem
     * const purchaseItem = await prisma.purchaseItem.upsert({
     *   create: {
     *     // ... data to create a PurchaseItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PurchaseItem we want to update
     *   }
     * })
     */
    upsert<T extends PurchaseItemUpsertArgs>(args: SelectSubset<T, PurchaseItemUpsertArgs<ExtArgs>>): Prisma__PurchaseItemClient<$Result.GetResult<Prisma.$PurchaseItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PurchaseItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseItemCountArgs} args - Arguments to filter PurchaseItems to count.
     * @example
     * // Count the number of PurchaseItems
     * const count = await prisma.purchaseItem.count({
     *   where: {
     *     // ... the filter for the PurchaseItems we want to count
     *   }
     * })
    **/
    count<T extends PurchaseItemCountArgs>(
      args?: Subset<T, PurchaseItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PurchaseItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PurchaseItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PurchaseItemAggregateArgs>(args: Subset<T, PurchaseItemAggregateArgs>): Prisma.PrismaPromise<GetPurchaseItemAggregateType<T>>

    /**
     * Group by PurchaseItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PurchaseItemGroupByArgs} args - Group by arguments.
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
      T extends PurchaseItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PurchaseItemGroupByArgs['orderBy'] }
        : { orderBy?: PurchaseItemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PurchaseItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPurchaseItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PurchaseItem model
   */
  readonly fields: PurchaseItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PurchaseItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PurchaseItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    purchase<T extends PurchaseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PurchaseDefaultArgs<ExtArgs>>): Prisma__PurchaseClient<$Result.GetResult<Prisma.$PurchasePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the PurchaseItem model
   */ 
  interface PurchaseItemFieldRefs {
    readonly id: FieldRef<"PurchaseItem", 'Int'>
    readonly purchaseId: FieldRef<"PurchaseItem", 'Int'>
    readonly itemName: FieldRef<"PurchaseItem", 'String'>
    readonly quantity: FieldRef<"PurchaseItem", 'Decimal'>
    readonly unit: FieldRef<"PurchaseItem", 'String'>
    readonly unitPrice: FieldRef<"PurchaseItem", 'Decimal'>
    readonly totalPrice: FieldRef<"PurchaseItem", 'Decimal'>
    readonly createdAt: FieldRef<"PurchaseItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PurchaseItem findUnique
   */
  export type PurchaseItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseItem
     */
    select?: PurchaseItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseItemInclude<ExtArgs> | null
    /**
     * Filter, which PurchaseItem to fetch.
     */
    where: PurchaseItemWhereUniqueInput
  }

  /**
   * PurchaseItem findUniqueOrThrow
   */
  export type PurchaseItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseItem
     */
    select?: PurchaseItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseItemInclude<ExtArgs> | null
    /**
     * Filter, which PurchaseItem to fetch.
     */
    where: PurchaseItemWhereUniqueInput
  }

  /**
   * PurchaseItem findFirst
   */
  export type PurchaseItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseItem
     */
    select?: PurchaseItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseItemInclude<ExtArgs> | null
    /**
     * Filter, which PurchaseItem to fetch.
     */
    where?: PurchaseItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PurchaseItems to fetch.
     */
    orderBy?: PurchaseItemOrderByWithRelationInput | PurchaseItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PurchaseItems.
     */
    cursor?: PurchaseItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PurchaseItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PurchaseItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PurchaseItems.
     */
    distinct?: PurchaseItemScalarFieldEnum | PurchaseItemScalarFieldEnum[]
  }

  /**
   * PurchaseItem findFirstOrThrow
   */
  export type PurchaseItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseItem
     */
    select?: PurchaseItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseItemInclude<ExtArgs> | null
    /**
     * Filter, which PurchaseItem to fetch.
     */
    where?: PurchaseItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PurchaseItems to fetch.
     */
    orderBy?: PurchaseItemOrderByWithRelationInput | PurchaseItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PurchaseItems.
     */
    cursor?: PurchaseItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PurchaseItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PurchaseItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PurchaseItems.
     */
    distinct?: PurchaseItemScalarFieldEnum | PurchaseItemScalarFieldEnum[]
  }

  /**
   * PurchaseItem findMany
   */
  export type PurchaseItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseItem
     */
    select?: PurchaseItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseItemInclude<ExtArgs> | null
    /**
     * Filter, which PurchaseItems to fetch.
     */
    where?: PurchaseItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PurchaseItems to fetch.
     */
    orderBy?: PurchaseItemOrderByWithRelationInput | PurchaseItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PurchaseItems.
     */
    cursor?: PurchaseItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PurchaseItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PurchaseItems.
     */
    skip?: number
    distinct?: PurchaseItemScalarFieldEnum | PurchaseItemScalarFieldEnum[]
  }

  /**
   * PurchaseItem create
   */
  export type PurchaseItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseItem
     */
    select?: PurchaseItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseItemInclude<ExtArgs> | null
    /**
     * The data needed to create a PurchaseItem.
     */
    data: XOR<PurchaseItemCreateInput, PurchaseItemUncheckedCreateInput>
  }

  /**
   * PurchaseItem createMany
   */
  export type PurchaseItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PurchaseItems.
     */
    data: PurchaseItemCreateManyInput | PurchaseItemCreateManyInput[]
  }

  /**
   * PurchaseItem createManyAndReturn
   */
  export type PurchaseItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseItem
     */
    select?: PurchaseItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PurchaseItems.
     */
    data: PurchaseItemCreateManyInput | PurchaseItemCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PurchaseItem update
   */
  export type PurchaseItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseItem
     */
    select?: PurchaseItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseItemInclude<ExtArgs> | null
    /**
     * The data needed to update a PurchaseItem.
     */
    data: XOR<PurchaseItemUpdateInput, PurchaseItemUncheckedUpdateInput>
    /**
     * Choose, which PurchaseItem to update.
     */
    where: PurchaseItemWhereUniqueInput
  }

  /**
   * PurchaseItem updateMany
   */
  export type PurchaseItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PurchaseItems.
     */
    data: XOR<PurchaseItemUpdateManyMutationInput, PurchaseItemUncheckedUpdateManyInput>
    /**
     * Filter which PurchaseItems to update
     */
    where?: PurchaseItemWhereInput
  }

  /**
   * PurchaseItem upsert
   */
  export type PurchaseItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseItem
     */
    select?: PurchaseItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseItemInclude<ExtArgs> | null
    /**
     * The filter to search for the PurchaseItem to update in case it exists.
     */
    where: PurchaseItemWhereUniqueInput
    /**
     * In case the PurchaseItem found by the `where` argument doesn't exist, create a new PurchaseItem with this data.
     */
    create: XOR<PurchaseItemCreateInput, PurchaseItemUncheckedCreateInput>
    /**
     * In case the PurchaseItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PurchaseItemUpdateInput, PurchaseItemUncheckedUpdateInput>
  }

  /**
   * PurchaseItem delete
   */
  export type PurchaseItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseItem
     */
    select?: PurchaseItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseItemInclude<ExtArgs> | null
    /**
     * Filter which PurchaseItem to delete.
     */
    where: PurchaseItemWhereUniqueInput
  }

  /**
   * PurchaseItem deleteMany
   */
  export type PurchaseItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PurchaseItems to delete
     */
    where?: PurchaseItemWhereInput
  }

  /**
   * PurchaseItem without action
   */
  export type PurchaseItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PurchaseItem
     */
    select?: PurchaseItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PurchaseItemInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    role: 'role',
    password: 'password',
    featureAccessOverrides: 'featureAccessOverrides',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const StaffAttendanceScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    attendanceDate: 'attendanceDate',
    status: 'status',
    checkIn: 'checkIn',
    checkOut: 'checkOut',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StaffAttendanceScalarFieldEnum = (typeof StaffAttendanceScalarFieldEnum)[keyof typeof StaffAttendanceScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    isDeleted: 'isDeleted',
    createdAt: 'createdAt'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const MenuItemScalarFieldEnum: {
    id: 'id',
    name: 'name',
    price: 'price',
    categoryId: 'categoryId',
    isAvailable: 'isAvailable',
    imageUrl: 'imageUrl',
    isDeleted: 'isDeleted',
    createdAt: 'createdAt'
  };

  export type MenuItemScalarFieldEnum = (typeof MenuItemScalarFieldEnum)[keyof typeof MenuItemScalarFieldEnum]


  export const OrderScalarFieldEnum: {
    id: 'id',
    billNumber: 'billNumber',
    status: 'status',
    paymentStatus: 'paymentStatus',
    customerName: 'customerName',
    customerPhone: 'customerPhone',
    tableId: 'tableId',
    orderType: 'orderType',
    subtotal: 'subtotal',
    discountAmount: 'discountAmount',
    taxAmount: 'taxAmount',
    finalAmount: 'finalAmount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const KotTicketScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    kotNumber: 'kotNumber',
    status: 'status',
    printedAt: 'printedAt',
    createdAt: 'createdAt'
  };

  export type KotTicketScalarFieldEnum = (typeof KotTicketScalarFieldEnum)[keyof typeof KotTicketScalarFieldEnum]


  export const KotItemScalarFieldEnum: {
    id: 'id',
    kotTicketId: 'kotTicketId',
    orderItemId: 'orderItemId',
    menuItemId: 'menuItemId',
    name: 'name',
    quantity: 'quantity',
    note: 'note',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type KotItemScalarFieldEnum = (typeof KotItemScalarFieldEnum)[keyof typeof KotItemScalarFieldEnum]


  export const BillSequenceScalarFieldEnum: {
    id: 'id',
    businessDate: 'businessDate',
    lastNumber: 'lastNumber',
    updatedAt: 'updatedAt'
  };

  export type BillSequenceScalarFieldEnum = (typeof BillSequenceScalarFieldEnum)[keyof typeof BillSequenceScalarFieldEnum]


  export const OrderItemScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    menuItemId: 'menuItemId',
    name: 'name',
    price: 'price',
    quantity: 'quantity',
    createdAt: 'createdAt'
  };

  export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    method: 'method',
    source: 'source',
    status: 'status',
    amount: 'amount',
    settledAmount: 'settledAmount',
    referenceId: 'referenceId',
    settledAt: 'settledAt',
    createdAt: 'createdAt'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const ExpenseScalarFieldEnum: {
    id: 'id',
    expenseDate: 'expenseDate',
    category: 'category',
    note: 'note',
    amount: 'amount',
    paymentMethod: 'paymentMethod',
    reference: 'reference',
    createdAt: 'createdAt'
  };

  export type ExpenseScalarFieldEnum = (typeof ExpenseScalarFieldEnum)[keyof typeof ExpenseScalarFieldEnum]


  export const SupplierScalarFieldEnum: {
    id: 'id',
    name: 'name',
    phone: 'phone',
    email: 'email',
    address: 'address',
    notes: 'notes',
    createdAt: 'createdAt'
  };

  export type SupplierScalarFieldEnum = (typeof SupplierScalarFieldEnum)[keyof typeof SupplierScalarFieldEnum]


  export const PurchaseScalarFieldEnum: {
    id: 'id',
    supplierId: 'supplierId',
    purchaseDate: 'purchaseDate',
    invoiceNumber: 'invoiceNumber',
    paymentStatus: 'paymentStatus',
    subtotal: 'subtotal',
    taxAmount: 'taxAmount',
    discountAmount: 'discountAmount',
    totalAmount: 'totalAmount',
    paidAmount: 'paidAmount',
    note: 'note',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PurchaseScalarFieldEnum = (typeof PurchaseScalarFieldEnum)[keyof typeof PurchaseScalarFieldEnum]


  export const PurchaseItemScalarFieldEnum: {
    id: 'id',
    purchaseId: 'purchaseId',
    itemName: 'itemName',
    quantity: 'quantity',
    unit: 'unit',
    unitPrice: 'unitPrice',
    totalPrice: 'totalPrice',
    createdAt: 'createdAt'
  };

  export type PurchaseItemScalarFieldEnum = (typeof PurchaseItemScalarFieldEnum)[keyof typeof PurchaseItemScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


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
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    name?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    featureAccessOverrides?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    attendances?: StaffAttendanceListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    password?: SortOrder
    featureAccessOverrides?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    attendances?: StaffAttendanceOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    role?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    featureAccessOverrides?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    attendances?: StaffAttendanceListRelationFilter
  }, "id" | "name">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    password?: SortOrder
    featureAccessOverrides?: SortOrderInput | SortOrder
    createdAt?: SortOrder
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
    name?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    featureAccessOverrides?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type StaffAttendanceWhereInput = {
    AND?: StaffAttendanceWhereInput | StaffAttendanceWhereInput[]
    OR?: StaffAttendanceWhereInput[]
    NOT?: StaffAttendanceWhereInput | StaffAttendanceWhereInput[]
    id?: IntFilter<"StaffAttendance"> | number
    userId?: IntFilter<"StaffAttendance"> | number
    attendanceDate?: StringFilter<"StaffAttendance"> | string
    status?: StringFilter<"StaffAttendance"> | string
    checkIn?: StringNullableFilter<"StaffAttendance"> | string | null
    checkOut?: StringNullableFilter<"StaffAttendance"> | string | null
    notes?: StringNullableFilter<"StaffAttendance"> | string | null
    createdAt?: DateTimeFilter<"StaffAttendance"> | Date | string
    updatedAt?: DateTimeFilter<"StaffAttendance"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type StaffAttendanceOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    attendanceDate?: SortOrder
    status?: SortOrder
    checkIn?: SortOrderInput | SortOrder
    checkOut?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type StaffAttendanceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_attendanceDate?: StaffAttendanceUserIdAttendanceDateCompoundUniqueInput
    AND?: StaffAttendanceWhereInput | StaffAttendanceWhereInput[]
    OR?: StaffAttendanceWhereInput[]
    NOT?: StaffAttendanceWhereInput | StaffAttendanceWhereInput[]
    userId?: IntFilter<"StaffAttendance"> | number
    attendanceDate?: StringFilter<"StaffAttendance"> | string
    status?: StringFilter<"StaffAttendance"> | string
    checkIn?: StringNullableFilter<"StaffAttendance"> | string | null
    checkOut?: StringNullableFilter<"StaffAttendance"> | string | null
    notes?: StringNullableFilter<"StaffAttendance"> | string | null
    createdAt?: DateTimeFilter<"StaffAttendance"> | Date | string
    updatedAt?: DateTimeFilter<"StaffAttendance"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "userId_attendanceDate">

  export type StaffAttendanceOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    attendanceDate?: SortOrder
    status?: SortOrder
    checkIn?: SortOrderInput | SortOrder
    checkOut?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StaffAttendanceCountOrderByAggregateInput
    _avg?: StaffAttendanceAvgOrderByAggregateInput
    _max?: StaffAttendanceMaxOrderByAggregateInput
    _min?: StaffAttendanceMinOrderByAggregateInput
    _sum?: StaffAttendanceSumOrderByAggregateInput
  }

  export type StaffAttendanceScalarWhereWithAggregatesInput = {
    AND?: StaffAttendanceScalarWhereWithAggregatesInput | StaffAttendanceScalarWhereWithAggregatesInput[]
    OR?: StaffAttendanceScalarWhereWithAggregatesInput[]
    NOT?: StaffAttendanceScalarWhereWithAggregatesInput | StaffAttendanceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"StaffAttendance"> | number
    userId?: IntWithAggregatesFilter<"StaffAttendance"> | number
    attendanceDate?: StringWithAggregatesFilter<"StaffAttendance"> | string
    status?: StringWithAggregatesFilter<"StaffAttendance"> | string
    checkIn?: StringNullableWithAggregatesFilter<"StaffAttendance"> | string | null
    checkOut?: StringNullableWithAggregatesFilter<"StaffAttendance"> | string | null
    notes?: StringNullableWithAggregatesFilter<"StaffAttendance"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"StaffAttendance"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StaffAttendance"> | Date | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: IntFilter<"Category"> | number
    name?: StringFilter<"Category"> | string
    isDeleted?: BoolFilter<"Category"> | boolean
    createdAt?: DateTimeFilter<"Category"> | Date | string
    menuItems?: MenuItemListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
    menuItems?: MenuItemOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    name?: StringFilter<"Category"> | string
    isDeleted?: BoolFilter<"Category"> | boolean
    createdAt?: DateTimeFilter<"Category"> | Date | string
    menuItems?: MenuItemListRelationFilter
  }, "id">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _avg?: CategoryAvgOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
    _sum?: CategorySumOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Category"> | number
    name?: StringWithAggregatesFilter<"Category"> | string
    isDeleted?: BoolWithAggregatesFilter<"Category"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
  }

  export type MenuItemWhereInput = {
    AND?: MenuItemWhereInput | MenuItemWhereInput[]
    OR?: MenuItemWhereInput[]
    NOT?: MenuItemWhereInput | MenuItemWhereInput[]
    id?: IntFilter<"MenuItem"> | number
    name?: StringFilter<"MenuItem"> | string
    price?: DecimalFilter<"MenuItem"> | Decimal | DecimalJsLike | number | string
    categoryId?: IntFilter<"MenuItem"> | number
    isAvailable?: BoolFilter<"MenuItem"> | boolean
    imageUrl?: StringNullableFilter<"MenuItem"> | string | null
    isDeleted?: BoolFilter<"MenuItem"> | boolean
    createdAt?: DateTimeFilter<"MenuItem"> | Date | string
    category?: XOR<CategoryRelationFilter, CategoryWhereInput>
    orderItems?: OrderItemListRelationFilter
  }

  export type MenuItemOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    categoryId?: SortOrder
    isAvailable?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
    category?: CategoryOrderByWithRelationInput
    orderItems?: OrderItemOrderByRelationAggregateInput
  }

  export type MenuItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MenuItemWhereInput | MenuItemWhereInput[]
    OR?: MenuItemWhereInput[]
    NOT?: MenuItemWhereInput | MenuItemWhereInput[]
    name?: StringFilter<"MenuItem"> | string
    price?: DecimalFilter<"MenuItem"> | Decimal | DecimalJsLike | number | string
    categoryId?: IntFilter<"MenuItem"> | number
    isAvailable?: BoolFilter<"MenuItem"> | boolean
    imageUrl?: StringNullableFilter<"MenuItem"> | string | null
    isDeleted?: BoolFilter<"MenuItem"> | boolean
    createdAt?: DateTimeFilter<"MenuItem"> | Date | string
    category?: XOR<CategoryRelationFilter, CategoryWhereInput>
    orderItems?: OrderItemListRelationFilter
  }, "id">

  export type MenuItemOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    categoryId?: SortOrder
    isAvailable?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
    _count?: MenuItemCountOrderByAggregateInput
    _avg?: MenuItemAvgOrderByAggregateInput
    _max?: MenuItemMaxOrderByAggregateInput
    _min?: MenuItemMinOrderByAggregateInput
    _sum?: MenuItemSumOrderByAggregateInput
  }

  export type MenuItemScalarWhereWithAggregatesInput = {
    AND?: MenuItemScalarWhereWithAggregatesInput | MenuItemScalarWhereWithAggregatesInput[]
    OR?: MenuItemScalarWhereWithAggregatesInput[]
    NOT?: MenuItemScalarWhereWithAggregatesInput | MenuItemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"MenuItem"> | number
    name?: StringWithAggregatesFilter<"MenuItem"> | string
    price?: DecimalWithAggregatesFilter<"MenuItem"> | Decimal | DecimalJsLike | number | string
    categoryId?: IntWithAggregatesFilter<"MenuItem"> | number
    isAvailable?: BoolWithAggregatesFilter<"MenuItem"> | boolean
    imageUrl?: StringNullableWithAggregatesFilter<"MenuItem"> | string | null
    isDeleted?: BoolWithAggregatesFilter<"MenuItem"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"MenuItem"> | Date | string
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: IntFilter<"Order"> | number
    billNumber?: StringFilter<"Order"> | string
    status?: StringFilter<"Order"> | string
    paymentStatus?: StringFilter<"Order"> | string
    customerName?: StringNullableFilter<"Order"> | string | null
    customerPhone?: StringNullableFilter<"Order"> | string | null
    tableId?: IntNullableFilter<"Order"> | number | null
    orderType?: StringFilter<"Order"> | string
    subtotal?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    finalAmount?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    items?: OrderItemListRelationFilter
    payments?: PaymentListRelationFilter
    kotTickets?: KotTicketListRelationFilter
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    billNumber?: SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    customerName?: SortOrderInput | SortOrder
    customerPhone?: SortOrderInput | SortOrder
    tableId?: SortOrderInput | SortOrder
    orderType?: SortOrder
    subtotal?: SortOrder
    discountAmount?: SortOrder
    taxAmount?: SortOrder
    finalAmount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    items?: OrderItemOrderByRelationAggregateInput
    payments?: PaymentOrderByRelationAggregateInput
    kotTickets?: KotTicketOrderByRelationAggregateInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    billNumber?: string
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    status?: StringFilter<"Order"> | string
    paymentStatus?: StringFilter<"Order"> | string
    customerName?: StringNullableFilter<"Order"> | string | null
    customerPhone?: StringNullableFilter<"Order"> | string | null
    tableId?: IntNullableFilter<"Order"> | number | null
    orderType?: StringFilter<"Order"> | string
    subtotal?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    finalAmount?: DecimalFilter<"Order"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    items?: OrderItemListRelationFilter
    payments?: PaymentListRelationFilter
    kotTickets?: KotTicketListRelationFilter
  }, "id" | "billNumber">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    billNumber?: SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    customerName?: SortOrderInput | SortOrder
    customerPhone?: SortOrderInput | SortOrder
    tableId?: SortOrderInput | SortOrder
    orderType?: SortOrder
    subtotal?: SortOrder
    discountAmount?: SortOrder
    taxAmount?: SortOrder
    finalAmount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OrderCountOrderByAggregateInput
    _avg?: OrderAvgOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
    _sum?: OrderSumOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Order"> | number
    billNumber?: StringWithAggregatesFilter<"Order"> | string
    status?: StringWithAggregatesFilter<"Order"> | string
    paymentStatus?: StringWithAggregatesFilter<"Order"> | string
    customerName?: StringNullableWithAggregatesFilter<"Order"> | string | null
    customerPhone?: StringNullableWithAggregatesFilter<"Order"> | string | null
    tableId?: IntNullableWithAggregatesFilter<"Order"> | number | null
    orderType?: StringWithAggregatesFilter<"Order"> | string
    subtotal?: DecimalWithAggregatesFilter<"Order"> | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalWithAggregatesFilter<"Order"> | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalWithAggregatesFilter<"Order"> | Decimal | DecimalJsLike | number | string
    finalAmount?: DecimalWithAggregatesFilter<"Order"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
  }

  export type KotTicketWhereInput = {
    AND?: KotTicketWhereInput | KotTicketWhereInput[]
    OR?: KotTicketWhereInput[]
    NOT?: KotTicketWhereInput | KotTicketWhereInput[]
    id?: IntFilter<"KotTicket"> | number
    orderId?: IntFilter<"KotTicket"> | number
    kotNumber?: StringFilter<"KotTicket"> | string
    status?: StringFilter<"KotTicket"> | string
    printedAt?: DateTimeNullableFilter<"KotTicket"> | Date | string | null
    createdAt?: DateTimeFilter<"KotTicket"> | Date | string
    order?: XOR<OrderRelationFilter, OrderWhereInput>
    items?: KotItemListRelationFilter
  }

  export type KotTicketOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    kotNumber?: SortOrder
    status?: SortOrder
    printedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    order?: OrderOrderByWithRelationInput
    items?: KotItemOrderByRelationAggregateInput
  }

  export type KotTicketWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    kotNumber?: string
    AND?: KotTicketWhereInput | KotTicketWhereInput[]
    OR?: KotTicketWhereInput[]
    NOT?: KotTicketWhereInput | KotTicketWhereInput[]
    orderId?: IntFilter<"KotTicket"> | number
    status?: StringFilter<"KotTicket"> | string
    printedAt?: DateTimeNullableFilter<"KotTicket"> | Date | string | null
    createdAt?: DateTimeFilter<"KotTicket"> | Date | string
    order?: XOR<OrderRelationFilter, OrderWhereInput>
    items?: KotItemListRelationFilter
  }, "id" | "kotNumber">

  export type KotTicketOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    kotNumber?: SortOrder
    status?: SortOrder
    printedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: KotTicketCountOrderByAggregateInput
    _avg?: KotTicketAvgOrderByAggregateInput
    _max?: KotTicketMaxOrderByAggregateInput
    _min?: KotTicketMinOrderByAggregateInput
    _sum?: KotTicketSumOrderByAggregateInput
  }

  export type KotTicketScalarWhereWithAggregatesInput = {
    AND?: KotTicketScalarWhereWithAggregatesInput | KotTicketScalarWhereWithAggregatesInput[]
    OR?: KotTicketScalarWhereWithAggregatesInput[]
    NOT?: KotTicketScalarWhereWithAggregatesInput | KotTicketScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"KotTicket"> | number
    orderId?: IntWithAggregatesFilter<"KotTicket"> | number
    kotNumber?: StringWithAggregatesFilter<"KotTicket"> | string
    status?: StringWithAggregatesFilter<"KotTicket"> | string
    printedAt?: DateTimeNullableWithAggregatesFilter<"KotTicket"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"KotTicket"> | Date | string
  }

  export type KotItemWhereInput = {
    AND?: KotItemWhereInput | KotItemWhereInput[]
    OR?: KotItemWhereInput[]
    NOT?: KotItemWhereInput | KotItemWhereInput[]
    id?: IntFilter<"KotItem"> | number
    kotTicketId?: IntFilter<"KotItem"> | number
    orderItemId?: IntNullableFilter<"KotItem"> | number | null
    menuItemId?: IntFilter<"KotItem"> | number
    name?: StringFilter<"KotItem"> | string
    quantity?: IntFilter<"KotItem"> | number
    note?: StringNullableFilter<"KotItem"> | string | null
    status?: StringFilter<"KotItem"> | string
    createdAt?: DateTimeFilter<"KotItem"> | Date | string
    ticket?: XOR<KotTicketRelationFilter, KotTicketWhereInput>
  }

  export type KotItemOrderByWithRelationInput = {
    id?: SortOrder
    kotTicketId?: SortOrder
    orderItemId?: SortOrderInput | SortOrder
    menuItemId?: SortOrder
    name?: SortOrder
    quantity?: SortOrder
    note?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    ticket?: KotTicketOrderByWithRelationInput
  }

  export type KotItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: KotItemWhereInput | KotItemWhereInput[]
    OR?: KotItemWhereInput[]
    NOT?: KotItemWhereInput | KotItemWhereInput[]
    kotTicketId?: IntFilter<"KotItem"> | number
    orderItemId?: IntNullableFilter<"KotItem"> | number | null
    menuItemId?: IntFilter<"KotItem"> | number
    name?: StringFilter<"KotItem"> | string
    quantity?: IntFilter<"KotItem"> | number
    note?: StringNullableFilter<"KotItem"> | string | null
    status?: StringFilter<"KotItem"> | string
    createdAt?: DateTimeFilter<"KotItem"> | Date | string
    ticket?: XOR<KotTicketRelationFilter, KotTicketWhereInput>
  }, "id">

  export type KotItemOrderByWithAggregationInput = {
    id?: SortOrder
    kotTicketId?: SortOrder
    orderItemId?: SortOrderInput | SortOrder
    menuItemId?: SortOrder
    name?: SortOrder
    quantity?: SortOrder
    note?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: KotItemCountOrderByAggregateInput
    _avg?: KotItemAvgOrderByAggregateInput
    _max?: KotItemMaxOrderByAggregateInput
    _min?: KotItemMinOrderByAggregateInput
    _sum?: KotItemSumOrderByAggregateInput
  }

  export type KotItemScalarWhereWithAggregatesInput = {
    AND?: KotItemScalarWhereWithAggregatesInput | KotItemScalarWhereWithAggregatesInput[]
    OR?: KotItemScalarWhereWithAggregatesInput[]
    NOT?: KotItemScalarWhereWithAggregatesInput | KotItemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"KotItem"> | number
    kotTicketId?: IntWithAggregatesFilter<"KotItem"> | number
    orderItemId?: IntNullableWithAggregatesFilter<"KotItem"> | number | null
    menuItemId?: IntWithAggregatesFilter<"KotItem"> | number
    name?: StringWithAggregatesFilter<"KotItem"> | string
    quantity?: IntWithAggregatesFilter<"KotItem"> | number
    note?: StringNullableWithAggregatesFilter<"KotItem"> | string | null
    status?: StringWithAggregatesFilter<"KotItem"> | string
    createdAt?: DateTimeWithAggregatesFilter<"KotItem"> | Date | string
  }

  export type BillSequenceWhereInput = {
    AND?: BillSequenceWhereInput | BillSequenceWhereInput[]
    OR?: BillSequenceWhereInput[]
    NOT?: BillSequenceWhereInput | BillSequenceWhereInput[]
    id?: IntFilter<"BillSequence"> | number
    businessDate?: StringFilter<"BillSequence"> | string
    lastNumber?: IntFilter<"BillSequence"> | number
    updatedAt?: DateTimeFilter<"BillSequence"> | Date | string
  }

  export type BillSequenceOrderByWithRelationInput = {
    id?: SortOrder
    businessDate?: SortOrder
    lastNumber?: SortOrder
    updatedAt?: SortOrder
  }

  export type BillSequenceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    businessDate?: string
    AND?: BillSequenceWhereInput | BillSequenceWhereInput[]
    OR?: BillSequenceWhereInput[]
    NOT?: BillSequenceWhereInput | BillSequenceWhereInput[]
    lastNumber?: IntFilter<"BillSequence"> | number
    updatedAt?: DateTimeFilter<"BillSequence"> | Date | string
  }, "id" | "businessDate">

  export type BillSequenceOrderByWithAggregationInput = {
    id?: SortOrder
    businessDate?: SortOrder
    lastNumber?: SortOrder
    updatedAt?: SortOrder
    _count?: BillSequenceCountOrderByAggregateInput
    _avg?: BillSequenceAvgOrderByAggregateInput
    _max?: BillSequenceMaxOrderByAggregateInput
    _min?: BillSequenceMinOrderByAggregateInput
    _sum?: BillSequenceSumOrderByAggregateInput
  }

  export type BillSequenceScalarWhereWithAggregatesInput = {
    AND?: BillSequenceScalarWhereWithAggregatesInput | BillSequenceScalarWhereWithAggregatesInput[]
    OR?: BillSequenceScalarWhereWithAggregatesInput[]
    NOT?: BillSequenceScalarWhereWithAggregatesInput | BillSequenceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"BillSequence"> | number
    businessDate?: StringWithAggregatesFilter<"BillSequence"> | string
    lastNumber?: IntWithAggregatesFilter<"BillSequence"> | number
    updatedAt?: DateTimeWithAggregatesFilter<"BillSequence"> | Date | string
  }

  export type OrderItemWhereInput = {
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    id?: IntFilter<"OrderItem"> | number
    orderId?: IntFilter<"OrderItem"> | number
    menuItemId?: IntFilter<"OrderItem"> | number
    name?: StringFilter<"OrderItem"> | string
    price?: DecimalFilter<"OrderItem"> | Decimal | DecimalJsLike | number | string
    quantity?: IntFilter<"OrderItem"> | number
    createdAt?: DateTimeFilter<"OrderItem"> | Date | string
    order?: XOR<OrderRelationFilter, OrderWhereInput>
    menuItem?: XOR<MenuItemRelationFilter, MenuItemWhereInput>
  }

  export type OrderItemOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    menuItemId?: SortOrder
    name?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    order?: OrderOrderByWithRelationInput
    menuItem?: MenuItemOrderByWithRelationInput
  }

  export type OrderItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    orderId?: IntFilter<"OrderItem"> | number
    menuItemId?: IntFilter<"OrderItem"> | number
    name?: StringFilter<"OrderItem"> | string
    price?: DecimalFilter<"OrderItem"> | Decimal | DecimalJsLike | number | string
    quantity?: IntFilter<"OrderItem"> | number
    createdAt?: DateTimeFilter<"OrderItem"> | Date | string
    order?: XOR<OrderRelationFilter, OrderWhereInput>
    menuItem?: XOR<MenuItemRelationFilter, MenuItemWhereInput>
  }, "id">

  export type OrderItemOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    menuItemId?: SortOrder
    name?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
    _count?: OrderItemCountOrderByAggregateInput
    _avg?: OrderItemAvgOrderByAggregateInput
    _max?: OrderItemMaxOrderByAggregateInput
    _min?: OrderItemMinOrderByAggregateInput
    _sum?: OrderItemSumOrderByAggregateInput
  }

  export type OrderItemScalarWhereWithAggregatesInput = {
    AND?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    OR?: OrderItemScalarWhereWithAggregatesInput[]
    NOT?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"OrderItem"> | number
    orderId?: IntWithAggregatesFilter<"OrderItem"> | number
    menuItemId?: IntWithAggregatesFilter<"OrderItem"> | number
    name?: StringWithAggregatesFilter<"OrderItem"> | string
    price?: DecimalWithAggregatesFilter<"OrderItem"> | Decimal | DecimalJsLike | number | string
    quantity?: IntWithAggregatesFilter<"OrderItem"> | number
    createdAt?: DateTimeWithAggregatesFilter<"OrderItem"> | Date | string
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: IntFilter<"Payment"> | number
    orderId?: IntFilter<"Payment"> | number
    method?: StringFilter<"Payment"> | string
    source?: StringFilter<"Payment"> | string
    status?: StringFilter<"Payment"> | string
    amount?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    settledAmount?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    referenceId?: StringNullableFilter<"Payment"> | string | null
    settledAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    order?: XOR<OrderRelationFilter, OrderWhereInput>
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    method?: SortOrder
    source?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    settledAmount?: SortOrder
    referenceId?: SortOrderInput | SortOrder
    settledAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    order?: OrderOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    orderId?: IntFilter<"Payment"> | number
    method?: StringFilter<"Payment"> | string
    source?: StringFilter<"Payment"> | string
    status?: StringFilter<"Payment"> | string
    amount?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    settledAmount?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    referenceId?: StringNullableFilter<"Payment"> | string | null
    settledAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    order?: XOR<OrderRelationFilter, OrderWhereInput>
  }, "id">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    method?: SortOrder
    source?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    settledAmount?: SortOrder
    referenceId?: SortOrderInput | SortOrder
    settledAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Payment"> | number
    orderId?: IntWithAggregatesFilter<"Payment"> | number
    method?: StringWithAggregatesFilter<"Payment"> | string
    source?: StringWithAggregatesFilter<"Payment"> | string
    status?: StringWithAggregatesFilter<"Payment"> | string
    amount?: DecimalWithAggregatesFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    settledAmount?: DecimalWithAggregatesFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    referenceId?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    settledAt?: DateTimeNullableWithAggregatesFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
  }

  export type ExpenseWhereInput = {
    AND?: ExpenseWhereInput | ExpenseWhereInput[]
    OR?: ExpenseWhereInput[]
    NOT?: ExpenseWhereInput | ExpenseWhereInput[]
    id?: IntFilter<"Expense"> | number
    expenseDate?: DateTimeFilter<"Expense"> | Date | string
    category?: StringFilter<"Expense"> | string
    note?: StringFilter<"Expense"> | string
    amount?: DecimalFilter<"Expense"> | Decimal | DecimalJsLike | number | string
    paymentMethod?: StringFilter<"Expense"> | string
    reference?: StringNullableFilter<"Expense"> | string | null
    createdAt?: DateTimeFilter<"Expense"> | Date | string
  }

  export type ExpenseOrderByWithRelationInput = {
    id?: SortOrder
    expenseDate?: SortOrder
    category?: SortOrder
    note?: SortOrder
    amount?: SortOrder
    paymentMethod?: SortOrder
    reference?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type ExpenseWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ExpenseWhereInput | ExpenseWhereInput[]
    OR?: ExpenseWhereInput[]
    NOT?: ExpenseWhereInput | ExpenseWhereInput[]
    expenseDate?: DateTimeFilter<"Expense"> | Date | string
    category?: StringFilter<"Expense"> | string
    note?: StringFilter<"Expense"> | string
    amount?: DecimalFilter<"Expense"> | Decimal | DecimalJsLike | number | string
    paymentMethod?: StringFilter<"Expense"> | string
    reference?: StringNullableFilter<"Expense"> | string | null
    createdAt?: DateTimeFilter<"Expense"> | Date | string
  }, "id">

  export type ExpenseOrderByWithAggregationInput = {
    id?: SortOrder
    expenseDate?: SortOrder
    category?: SortOrder
    note?: SortOrder
    amount?: SortOrder
    paymentMethod?: SortOrder
    reference?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ExpenseCountOrderByAggregateInput
    _avg?: ExpenseAvgOrderByAggregateInput
    _max?: ExpenseMaxOrderByAggregateInput
    _min?: ExpenseMinOrderByAggregateInput
    _sum?: ExpenseSumOrderByAggregateInput
  }

  export type ExpenseScalarWhereWithAggregatesInput = {
    AND?: ExpenseScalarWhereWithAggregatesInput | ExpenseScalarWhereWithAggregatesInput[]
    OR?: ExpenseScalarWhereWithAggregatesInput[]
    NOT?: ExpenseScalarWhereWithAggregatesInput | ExpenseScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Expense"> | number
    expenseDate?: DateTimeWithAggregatesFilter<"Expense"> | Date | string
    category?: StringWithAggregatesFilter<"Expense"> | string
    note?: StringWithAggregatesFilter<"Expense"> | string
    amount?: DecimalWithAggregatesFilter<"Expense"> | Decimal | DecimalJsLike | number | string
    paymentMethod?: StringWithAggregatesFilter<"Expense"> | string
    reference?: StringNullableWithAggregatesFilter<"Expense"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Expense"> | Date | string
  }

  export type SupplierWhereInput = {
    AND?: SupplierWhereInput | SupplierWhereInput[]
    OR?: SupplierWhereInput[]
    NOT?: SupplierWhereInput | SupplierWhereInput[]
    id?: IntFilter<"Supplier"> | number
    name?: StringFilter<"Supplier"> | string
    phone?: StringNullableFilter<"Supplier"> | string | null
    email?: StringNullableFilter<"Supplier"> | string | null
    address?: StringNullableFilter<"Supplier"> | string | null
    notes?: StringNullableFilter<"Supplier"> | string | null
    createdAt?: DateTimeFilter<"Supplier"> | Date | string
    purchases?: PurchaseListRelationFilter
  }

  export type SupplierOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    purchases?: PurchaseOrderByRelationAggregateInput
  }

  export type SupplierWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: SupplierWhereInput | SupplierWhereInput[]
    OR?: SupplierWhereInput[]
    NOT?: SupplierWhereInput | SupplierWhereInput[]
    phone?: StringNullableFilter<"Supplier"> | string | null
    email?: StringNullableFilter<"Supplier"> | string | null
    address?: StringNullableFilter<"Supplier"> | string | null
    notes?: StringNullableFilter<"Supplier"> | string | null
    createdAt?: DateTimeFilter<"Supplier"> | Date | string
    purchases?: PurchaseListRelationFilter
  }, "id" | "name">

  export type SupplierOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SupplierCountOrderByAggregateInput
    _avg?: SupplierAvgOrderByAggregateInput
    _max?: SupplierMaxOrderByAggregateInput
    _min?: SupplierMinOrderByAggregateInput
    _sum?: SupplierSumOrderByAggregateInput
  }

  export type SupplierScalarWhereWithAggregatesInput = {
    AND?: SupplierScalarWhereWithAggregatesInput | SupplierScalarWhereWithAggregatesInput[]
    OR?: SupplierScalarWhereWithAggregatesInput[]
    NOT?: SupplierScalarWhereWithAggregatesInput | SupplierScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Supplier"> | number
    name?: StringWithAggregatesFilter<"Supplier"> | string
    phone?: StringNullableWithAggregatesFilter<"Supplier"> | string | null
    email?: StringNullableWithAggregatesFilter<"Supplier"> | string | null
    address?: StringNullableWithAggregatesFilter<"Supplier"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Supplier"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Supplier"> | Date | string
  }

  export type PurchaseWhereInput = {
    AND?: PurchaseWhereInput | PurchaseWhereInput[]
    OR?: PurchaseWhereInput[]
    NOT?: PurchaseWhereInput | PurchaseWhereInput[]
    id?: IntFilter<"Purchase"> | number
    supplierId?: IntFilter<"Purchase"> | number
    purchaseDate?: DateTimeFilter<"Purchase"> | Date | string
    invoiceNumber?: StringNullableFilter<"Purchase"> | string | null
    paymentStatus?: StringFilter<"Purchase"> | string
    subtotal?: DecimalFilter<"Purchase"> | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFilter<"Purchase"> | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFilter<"Purchase"> | Decimal | DecimalJsLike | number | string
    totalAmount?: DecimalFilter<"Purchase"> | Decimal | DecimalJsLike | number | string
    paidAmount?: DecimalFilter<"Purchase"> | Decimal | DecimalJsLike | number | string
    note?: StringNullableFilter<"Purchase"> | string | null
    createdAt?: DateTimeFilter<"Purchase"> | Date | string
    updatedAt?: DateTimeFilter<"Purchase"> | Date | string
    supplier?: XOR<SupplierRelationFilter, SupplierWhereInput>
    items?: PurchaseItemListRelationFilter
  }

  export type PurchaseOrderByWithRelationInput = {
    id?: SortOrder
    supplierId?: SortOrder
    purchaseDate?: SortOrder
    invoiceNumber?: SortOrderInput | SortOrder
    paymentStatus?: SortOrder
    subtotal?: SortOrder
    taxAmount?: SortOrder
    discountAmount?: SortOrder
    totalAmount?: SortOrder
    paidAmount?: SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    supplier?: SupplierOrderByWithRelationInput
    items?: PurchaseItemOrderByRelationAggregateInput
  }

  export type PurchaseWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PurchaseWhereInput | PurchaseWhereInput[]
    OR?: PurchaseWhereInput[]
    NOT?: PurchaseWhereInput | PurchaseWhereInput[]
    supplierId?: IntFilter<"Purchase"> | number
    purchaseDate?: DateTimeFilter<"Purchase"> | Date | string
    invoiceNumber?: StringNullableFilter<"Purchase"> | string | null
    paymentStatus?: StringFilter<"Purchase"> | string
    subtotal?: DecimalFilter<"Purchase"> | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFilter<"Purchase"> | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFilter<"Purchase"> | Decimal | DecimalJsLike | number | string
    totalAmount?: DecimalFilter<"Purchase"> | Decimal | DecimalJsLike | number | string
    paidAmount?: DecimalFilter<"Purchase"> | Decimal | DecimalJsLike | number | string
    note?: StringNullableFilter<"Purchase"> | string | null
    createdAt?: DateTimeFilter<"Purchase"> | Date | string
    updatedAt?: DateTimeFilter<"Purchase"> | Date | string
    supplier?: XOR<SupplierRelationFilter, SupplierWhereInput>
    items?: PurchaseItemListRelationFilter
  }, "id">

  export type PurchaseOrderByWithAggregationInput = {
    id?: SortOrder
    supplierId?: SortOrder
    purchaseDate?: SortOrder
    invoiceNumber?: SortOrderInput | SortOrder
    paymentStatus?: SortOrder
    subtotal?: SortOrder
    taxAmount?: SortOrder
    discountAmount?: SortOrder
    totalAmount?: SortOrder
    paidAmount?: SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PurchaseCountOrderByAggregateInput
    _avg?: PurchaseAvgOrderByAggregateInput
    _max?: PurchaseMaxOrderByAggregateInput
    _min?: PurchaseMinOrderByAggregateInput
    _sum?: PurchaseSumOrderByAggregateInput
  }

  export type PurchaseScalarWhereWithAggregatesInput = {
    AND?: PurchaseScalarWhereWithAggregatesInput | PurchaseScalarWhereWithAggregatesInput[]
    OR?: PurchaseScalarWhereWithAggregatesInput[]
    NOT?: PurchaseScalarWhereWithAggregatesInput | PurchaseScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Purchase"> | number
    supplierId?: IntWithAggregatesFilter<"Purchase"> | number
    purchaseDate?: DateTimeWithAggregatesFilter<"Purchase"> | Date | string
    invoiceNumber?: StringNullableWithAggregatesFilter<"Purchase"> | string | null
    paymentStatus?: StringWithAggregatesFilter<"Purchase"> | string
    subtotal?: DecimalWithAggregatesFilter<"Purchase"> | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalWithAggregatesFilter<"Purchase"> | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalWithAggregatesFilter<"Purchase"> | Decimal | DecimalJsLike | number | string
    totalAmount?: DecimalWithAggregatesFilter<"Purchase"> | Decimal | DecimalJsLike | number | string
    paidAmount?: DecimalWithAggregatesFilter<"Purchase"> | Decimal | DecimalJsLike | number | string
    note?: StringNullableWithAggregatesFilter<"Purchase"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Purchase"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Purchase"> | Date | string
  }

  export type PurchaseItemWhereInput = {
    AND?: PurchaseItemWhereInput | PurchaseItemWhereInput[]
    OR?: PurchaseItemWhereInput[]
    NOT?: PurchaseItemWhereInput | PurchaseItemWhereInput[]
    id?: IntFilter<"PurchaseItem"> | number
    purchaseId?: IntFilter<"PurchaseItem"> | number
    itemName?: StringFilter<"PurchaseItem"> | string
    quantity?: DecimalFilter<"PurchaseItem"> | Decimal | DecimalJsLike | number | string
    unit?: StringNullableFilter<"PurchaseItem"> | string | null
    unitPrice?: DecimalFilter<"PurchaseItem"> | Decimal | DecimalJsLike | number | string
    totalPrice?: DecimalFilter<"PurchaseItem"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"PurchaseItem"> | Date | string
    purchase?: XOR<PurchaseRelationFilter, PurchaseWhereInput>
  }

  export type PurchaseItemOrderByWithRelationInput = {
    id?: SortOrder
    purchaseId?: SortOrder
    itemName?: SortOrder
    quantity?: SortOrder
    unit?: SortOrderInput | SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrder
    createdAt?: SortOrder
    purchase?: PurchaseOrderByWithRelationInput
  }

  export type PurchaseItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PurchaseItemWhereInput | PurchaseItemWhereInput[]
    OR?: PurchaseItemWhereInput[]
    NOT?: PurchaseItemWhereInput | PurchaseItemWhereInput[]
    purchaseId?: IntFilter<"PurchaseItem"> | number
    itemName?: StringFilter<"PurchaseItem"> | string
    quantity?: DecimalFilter<"PurchaseItem"> | Decimal | DecimalJsLike | number | string
    unit?: StringNullableFilter<"PurchaseItem"> | string | null
    unitPrice?: DecimalFilter<"PurchaseItem"> | Decimal | DecimalJsLike | number | string
    totalPrice?: DecimalFilter<"PurchaseItem"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"PurchaseItem"> | Date | string
    purchase?: XOR<PurchaseRelationFilter, PurchaseWhereInput>
  }, "id">

  export type PurchaseItemOrderByWithAggregationInput = {
    id?: SortOrder
    purchaseId?: SortOrder
    itemName?: SortOrder
    quantity?: SortOrder
    unit?: SortOrderInput | SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrder
    createdAt?: SortOrder
    _count?: PurchaseItemCountOrderByAggregateInput
    _avg?: PurchaseItemAvgOrderByAggregateInput
    _max?: PurchaseItemMaxOrderByAggregateInput
    _min?: PurchaseItemMinOrderByAggregateInput
    _sum?: PurchaseItemSumOrderByAggregateInput
  }

  export type PurchaseItemScalarWhereWithAggregatesInput = {
    AND?: PurchaseItemScalarWhereWithAggregatesInput | PurchaseItemScalarWhereWithAggregatesInput[]
    OR?: PurchaseItemScalarWhereWithAggregatesInput[]
    NOT?: PurchaseItemScalarWhereWithAggregatesInput | PurchaseItemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PurchaseItem"> | number
    purchaseId?: IntWithAggregatesFilter<"PurchaseItem"> | number
    itemName?: StringWithAggregatesFilter<"PurchaseItem"> | string
    quantity?: DecimalWithAggregatesFilter<"PurchaseItem"> | Decimal | DecimalJsLike | number | string
    unit?: StringNullableWithAggregatesFilter<"PurchaseItem"> | string | null
    unitPrice?: DecimalWithAggregatesFilter<"PurchaseItem"> | Decimal | DecimalJsLike | number | string
    totalPrice?: DecimalWithAggregatesFilter<"PurchaseItem"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeWithAggregatesFilter<"PurchaseItem"> | Date | string
  }

  export type UserCreateInput = {
    name: string
    role: string
    password: string
    featureAccessOverrides?: string | null
    createdAt?: Date | string
    attendances?: StaffAttendanceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    name: string
    role: string
    password: string
    featureAccessOverrides?: string | null
    createdAt?: Date | string
    attendances?: StaffAttendanceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    featureAccessOverrides?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendances?: StaffAttendanceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    featureAccessOverrides?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendances?: StaffAttendanceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    name: string
    role: string
    password: string
    featureAccessOverrides?: string | null
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    featureAccessOverrides?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    featureAccessOverrides?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffAttendanceCreateInput = {
    attendanceDate: string
    status: string
    checkIn?: string | null
    checkOut?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAttendancesInput
  }

  export type StaffAttendanceUncheckedCreateInput = {
    id?: number
    userId: number
    attendanceDate: string
    status: string
    checkIn?: string | null
    checkOut?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StaffAttendanceUpdateInput = {
    attendanceDate?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    checkIn?: NullableStringFieldUpdateOperationsInput | string | null
    checkOut?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAttendancesNestedInput
  }

  export type StaffAttendanceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    attendanceDate?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    checkIn?: NullableStringFieldUpdateOperationsInput | string | null
    checkOut?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffAttendanceCreateManyInput = {
    id?: number
    userId: number
    attendanceDate: string
    status: string
    checkIn?: string | null
    checkOut?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StaffAttendanceUpdateManyMutationInput = {
    attendanceDate?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    checkIn?: NullableStringFieldUpdateOperationsInput | string | null
    checkOut?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffAttendanceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    attendanceDate?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    checkIn?: NullableStringFieldUpdateOperationsInput | string | null
    checkOut?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateInput = {
    name: string
    isDeleted?: boolean
    createdAt?: Date | string
    menuItems?: MenuItemCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: number
    name: string
    isDeleted?: boolean
    createdAt?: Date | string
    menuItems?: MenuItemUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    menuItems?: MenuItemUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    menuItems?: MenuItemUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: number
    name: string
    isDeleted?: boolean
    createdAt?: Date | string
  }

  export type CategoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenuItemCreateInput = {
    name: string
    price: Decimal | DecimalJsLike | number | string
    isAvailable?: boolean
    imageUrl?: string | null
    isDeleted?: boolean
    createdAt?: Date | string
    category: CategoryCreateNestedOneWithoutMenuItemsInput
    orderItems?: OrderItemCreateNestedManyWithoutMenuItemInput
  }

  export type MenuItemUncheckedCreateInput = {
    id?: number
    name: string
    price: Decimal | DecimalJsLike | number | string
    categoryId: number
    isAvailable?: boolean
    imageUrl?: string | null
    isDeleted?: boolean
    createdAt?: Date | string
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutMenuItemInput
  }

  export type MenuItemUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutMenuItemsNestedInput
    orderItems?: OrderItemUpdateManyWithoutMenuItemNestedInput
  }

  export type MenuItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    categoryId?: IntFieldUpdateOperationsInput | number
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderItems?: OrderItemUncheckedUpdateManyWithoutMenuItemNestedInput
  }

  export type MenuItemCreateManyInput = {
    id?: number
    name: string
    price: Decimal | DecimalJsLike | number | string
    categoryId: number
    isAvailable?: boolean
    imageUrl?: string | null
    isDeleted?: boolean
    createdAt?: Date | string
  }

  export type MenuItemUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenuItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    categoryId?: IntFieldUpdateOperationsInput | number
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateInput = {
    billNumber: string
    status?: string
    paymentStatus?: string
    customerName?: string | null
    customerPhone?: string | null
    tableId?: number | null
    orderType?: string
    subtotal?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    taxAmount?: Decimal | DecimalJsLike | number | string
    finalAmount?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemCreateNestedManyWithoutOrderInput
    payments?: PaymentCreateNestedManyWithoutOrderInput
    kotTickets?: KotTicketCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateInput = {
    id?: number
    billNumber: string
    status?: string
    paymentStatus?: string
    customerName?: string | null
    customerPhone?: string | null
    tableId?: number | null
    orderType?: string
    subtotal?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    taxAmount?: Decimal | DecimalJsLike | number | string
    finalAmount?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    payments?: PaymentUncheckedCreateNestedManyWithoutOrderInput
    kotTickets?: KotTicketUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderUpdateInput = {
    billNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    tableId?: NullableIntFieldUpdateOperationsInput | number | null
    orderType?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    finalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    payments?: PaymentUpdateManyWithoutOrderNestedInput
    kotTickets?: KotTicketUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    billNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    tableId?: NullableIntFieldUpdateOperationsInput | number | null
    orderType?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    finalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutOrderNestedInput
    kotTickets?: KotTicketUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateManyInput = {
    id?: number
    billNumber: string
    status?: string
    paymentStatus?: string
    customerName?: string | null
    customerPhone?: string | null
    tableId?: number | null
    orderType?: string
    subtotal?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    taxAmount?: Decimal | DecimalJsLike | number | string
    finalAmount?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateManyMutationInput = {
    billNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    tableId?: NullableIntFieldUpdateOperationsInput | number | null
    orderType?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    finalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    billNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    tableId?: NullableIntFieldUpdateOperationsInput | number | null
    orderType?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    finalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KotTicketCreateInput = {
    kotNumber: string
    status?: string
    printedAt?: Date | string | null
    createdAt?: Date | string
    order: OrderCreateNestedOneWithoutKotTicketsInput
    items?: KotItemCreateNestedManyWithoutTicketInput
  }

  export type KotTicketUncheckedCreateInput = {
    id?: number
    orderId: number
    kotNumber: string
    status?: string
    printedAt?: Date | string | null
    createdAt?: Date | string
    items?: KotItemUncheckedCreateNestedManyWithoutTicketInput
  }

  export type KotTicketUpdateInput = {
    kotNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    printedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutKotTicketsNestedInput
    items?: KotItemUpdateManyWithoutTicketNestedInput
  }

  export type KotTicketUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    kotNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    printedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: KotItemUncheckedUpdateManyWithoutTicketNestedInput
  }

  export type KotTicketCreateManyInput = {
    id?: number
    orderId: number
    kotNumber: string
    status?: string
    printedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type KotTicketUpdateManyMutationInput = {
    kotNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    printedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KotTicketUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    kotNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    printedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KotItemCreateInput = {
    orderItemId?: number | null
    menuItemId: number
    name: string
    quantity: number
    note?: string | null
    status?: string
    createdAt?: Date | string
    ticket: KotTicketCreateNestedOneWithoutItemsInput
  }

  export type KotItemUncheckedCreateInput = {
    id?: number
    kotTicketId: number
    orderItemId?: number | null
    menuItemId: number
    name: string
    quantity: number
    note?: string | null
    status?: string
    createdAt?: Date | string
  }

  export type KotItemUpdateInput = {
    orderItemId?: NullableIntFieldUpdateOperationsInput | number | null
    menuItemId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ticket?: KotTicketUpdateOneRequiredWithoutItemsNestedInput
  }

  export type KotItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    kotTicketId?: IntFieldUpdateOperationsInput | number
    orderItemId?: NullableIntFieldUpdateOperationsInput | number | null
    menuItemId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KotItemCreateManyInput = {
    id?: number
    kotTicketId: number
    orderItemId?: number | null
    menuItemId: number
    name: string
    quantity: number
    note?: string | null
    status?: string
    createdAt?: Date | string
  }

  export type KotItemUpdateManyMutationInput = {
    orderItemId?: NullableIntFieldUpdateOperationsInput | number | null
    menuItemId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KotItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    kotTicketId?: IntFieldUpdateOperationsInput | number
    orderItemId?: NullableIntFieldUpdateOperationsInput | number | null
    menuItemId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillSequenceCreateInput = {
    businessDate: string
    lastNumber?: number
    updatedAt?: Date | string
  }

  export type BillSequenceUncheckedCreateInput = {
    id?: number
    businessDate: string
    lastNumber?: number
    updatedAt?: Date | string
  }

  export type BillSequenceUpdateInput = {
    businessDate?: StringFieldUpdateOperationsInput | string
    lastNumber?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillSequenceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    businessDate?: StringFieldUpdateOperationsInput | string
    lastNumber?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillSequenceCreateManyInput = {
    id?: number
    businessDate: string
    lastNumber?: number
    updatedAt?: Date | string
  }

  export type BillSequenceUpdateManyMutationInput = {
    businessDate?: StringFieldUpdateOperationsInput | string
    lastNumber?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BillSequenceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    businessDate?: StringFieldUpdateOperationsInput | string
    lastNumber?: IntFieldUpdateOperationsInput | number
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemCreateInput = {
    name: string
    price: Decimal | DecimalJsLike | number | string
    quantity: number
    createdAt?: Date | string
    order: OrderCreateNestedOneWithoutItemsInput
    menuItem: MenuItemCreateNestedOneWithoutOrderItemsInput
  }

  export type OrderItemUncheckedCreateInput = {
    id?: number
    orderId: number
    menuItemId: number
    name: string
    price: Decimal | DecimalJsLike | number | string
    quantity: number
    createdAt?: Date | string
  }

  export type OrderItemUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
    menuItem?: MenuItemUpdateOneRequiredWithoutOrderItemsNestedInput
  }

  export type OrderItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    menuItemId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemCreateManyInput = {
    id?: number
    orderId: number
    menuItemId: number
    name: string
    price: Decimal | DecimalJsLike | number | string
    quantity: number
    createdAt?: Date | string
  }

  export type OrderItemUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    menuItemId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateInput = {
    method: string
    source?: string
    status?: string
    amount: Decimal | DecimalJsLike | number | string
    settledAmount?: Decimal | DecimalJsLike | number | string
    referenceId?: string | null
    settledAt?: Date | string | null
    createdAt?: Date | string
    order: OrderCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: number
    orderId: number
    method: string
    source?: string
    status?: string
    amount: Decimal | DecimalJsLike | number | string
    settledAmount?: Decimal | DecimalJsLike | number | string
    referenceId?: string | null
    settledAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PaymentUpdateInput = {
    method?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    settledAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    method?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    settledAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateManyInput = {
    id?: number
    orderId: number
    method: string
    source?: string
    status?: string
    amount: Decimal | DecimalJsLike | number | string
    settledAmount?: Decimal | DecimalJsLike | number | string
    referenceId?: string | null
    settledAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PaymentUpdateManyMutationInput = {
    method?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    settledAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    method?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    settledAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseCreateInput = {
    expenseDate: Date | string
    category: string
    note: string
    amount: Decimal | DecimalJsLike | number | string
    paymentMethod: string
    reference?: string | null
    createdAt?: Date | string
  }

  export type ExpenseUncheckedCreateInput = {
    id?: number
    expenseDate: Date | string
    category: string
    note: string
    amount: Decimal | DecimalJsLike | number | string
    paymentMethod: string
    reference?: string | null
    createdAt?: Date | string
  }

  export type ExpenseUpdateInput = {
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseCreateManyInput = {
    id?: number
    expenseDate: Date | string
    category: string
    note: string
    amount: Decimal | DecimalJsLike | number | string
    paymentMethod: string
    reference?: string | null
    createdAt?: Date | string
  }

  export type ExpenseUpdateManyMutationInput = {
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    expenseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: StringFieldUpdateOperationsInput | string
    note?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    reference?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplierCreateInput = {
    name: string
    phone?: string | null
    email?: string | null
    address?: string | null
    notes?: string | null
    createdAt?: Date | string
    purchases?: PurchaseCreateNestedManyWithoutSupplierInput
  }

  export type SupplierUncheckedCreateInput = {
    id?: number
    name: string
    phone?: string | null
    email?: string | null
    address?: string | null
    notes?: string | null
    createdAt?: Date | string
    purchases?: PurchaseUncheckedCreateNestedManyWithoutSupplierInput
  }

  export type SupplierUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purchases?: PurchaseUpdateManyWithoutSupplierNestedInput
  }

  export type SupplierUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purchases?: PurchaseUncheckedUpdateManyWithoutSupplierNestedInput
  }

  export type SupplierCreateManyInput = {
    id?: number
    name: string
    phone?: string | null
    email?: string | null
    address?: string | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type SupplierUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplierUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseCreateInput = {
    purchaseDate: Date | string
    invoiceNumber?: string | null
    paymentStatus?: string
    subtotal?: Decimal | DecimalJsLike | number | string
    taxAmount?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    totalAmount?: Decimal | DecimalJsLike | number | string
    paidAmount?: Decimal | DecimalJsLike | number | string
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    supplier: SupplierCreateNestedOneWithoutPurchasesInput
    items?: PurchaseItemCreateNestedManyWithoutPurchaseInput
  }

  export type PurchaseUncheckedCreateInput = {
    id?: number
    supplierId: number
    purchaseDate: Date | string
    invoiceNumber?: string | null
    paymentStatus?: string
    subtotal?: Decimal | DecimalJsLike | number | string
    taxAmount?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    totalAmount?: Decimal | DecimalJsLike | number | string
    paidAmount?: Decimal | DecimalJsLike | number | string
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: PurchaseItemUncheckedCreateNestedManyWithoutPurchaseInput
  }

  export type PurchaseUpdateInput = {
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paidAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supplier?: SupplierUpdateOneRequiredWithoutPurchasesNestedInput
    items?: PurchaseItemUpdateManyWithoutPurchaseNestedInput
  }

  export type PurchaseUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    supplierId?: IntFieldUpdateOperationsInput | number
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paidAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: PurchaseItemUncheckedUpdateManyWithoutPurchaseNestedInput
  }

  export type PurchaseCreateManyInput = {
    id?: number
    supplierId: number
    purchaseDate: Date | string
    invoiceNumber?: string | null
    paymentStatus?: string
    subtotal?: Decimal | DecimalJsLike | number | string
    taxAmount?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    totalAmount?: Decimal | DecimalJsLike | number | string
    paidAmount?: Decimal | DecimalJsLike | number | string
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PurchaseUpdateManyMutationInput = {
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paidAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    supplierId?: IntFieldUpdateOperationsInput | number
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paidAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseItemCreateInput = {
    itemName: string
    quantity: Decimal | DecimalJsLike | number | string
    unit?: string | null
    unitPrice: Decimal | DecimalJsLike | number | string
    totalPrice: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    purchase: PurchaseCreateNestedOneWithoutItemsInput
  }

  export type PurchaseItemUncheckedCreateInput = {
    id?: number
    purchaseId: number
    itemName: string
    quantity: Decimal | DecimalJsLike | number | string
    unit?: string | null
    unitPrice: Decimal | DecimalJsLike | number | string
    totalPrice: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type PurchaseItemUpdateInput = {
    itemName?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    purchase?: PurchaseUpdateOneRequiredWithoutItemsNestedInput
  }

  export type PurchaseItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    purchaseId?: IntFieldUpdateOperationsInput | number
    itemName?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseItemCreateManyInput = {
    id?: number
    purchaseId: number
    itemName: string
    quantity: Decimal | DecimalJsLike | number | string
    unit?: string | null
    unitPrice: Decimal | DecimalJsLike | number | string
    totalPrice: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type PurchaseItemUpdateManyMutationInput = {
    itemName?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    purchaseId?: IntFieldUpdateOperationsInput | number
    itemName?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StaffAttendanceListRelationFilter = {
    every?: StaffAttendanceWhereInput
    some?: StaffAttendanceWhereInput
    none?: StaffAttendanceWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type StaffAttendanceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    password?: SortOrder
    featureAccessOverrides?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    password?: SortOrder
    featureAccessOverrides?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    role?: SortOrder
    password?: SortOrder
    featureAccessOverrides?: SortOrder
    createdAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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
    in?: string[]
    notIn?: string[]
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

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
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

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type StaffAttendanceUserIdAttendanceDateCompoundUniqueInput = {
    userId: number
    attendanceDate: string
  }

  export type StaffAttendanceCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    attendanceDate?: SortOrder
    status?: SortOrder
    checkIn?: SortOrder
    checkOut?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StaffAttendanceAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type StaffAttendanceMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    attendanceDate?: SortOrder
    status?: SortOrder
    checkIn?: SortOrder
    checkOut?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StaffAttendanceMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    attendanceDate?: SortOrder
    status?: SortOrder
    checkIn?: SortOrder
    checkOut?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StaffAttendanceSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type MenuItemListRelationFilter = {
    every?: MenuItemWhereInput
    some?: MenuItemWhereInput
    none?: MenuItemWhereInput
  }

  export type MenuItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
  }

  export type CategoryAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
  }

  export type CategorySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type CategoryRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type OrderItemListRelationFilter = {
    every?: OrderItemWhereInput
    some?: OrderItemWhereInput
    none?: OrderItemWhereInput
  }

  export type OrderItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MenuItemCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    categoryId?: SortOrder
    isAvailable?: SortOrder
    imageUrl?: SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
  }

  export type MenuItemAvgOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    categoryId?: SortOrder
  }

  export type MenuItemMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    categoryId?: SortOrder
    isAvailable?: SortOrder
    imageUrl?: SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
  }

  export type MenuItemMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    price?: SortOrder
    categoryId?: SortOrder
    isAvailable?: SortOrder
    imageUrl?: SortOrder
    isDeleted?: SortOrder
    createdAt?: SortOrder
  }

  export type MenuItemSumOrderByAggregateInput = {
    id?: SortOrder
    price?: SortOrder
    categoryId?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type KotTicketListRelationFilter = {
    every?: KotTicketWhereInput
    some?: KotTicketWhereInput
    none?: KotTicketWhereInput
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type KotTicketOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    billNumber?: SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    tableId?: SortOrder
    orderType?: SortOrder
    subtotal?: SortOrder
    discountAmount?: SortOrder
    taxAmount?: SortOrder
    finalAmount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    id?: SortOrder
    tableId?: SortOrder
    subtotal?: SortOrder
    discountAmount?: SortOrder
    taxAmount?: SortOrder
    finalAmount?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    billNumber?: SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    tableId?: SortOrder
    orderType?: SortOrder
    subtotal?: SortOrder
    discountAmount?: SortOrder
    taxAmount?: SortOrder
    finalAmount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    billNumber?: SortOrder
    status?: SortOrder
    paymentStatus?: SortOrder
    customerName?: SortOrder
    customerPhone?: SortOrder
    tableId?: SortOrder
    orderType?: SortOrder
    subtotal?: SortOrder
    discountAmount?: SortOrder
    taxAmount?: SortOrder
    finalAmount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    id?: SortOrder
    tableId?: SortOrder
    subtotal?: SortOrder
    discountAmount?: SortOrder
    taxAmount?: SortOrder
    finalAmount?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
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

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type OrderRelationFilter = {
    is?: OrderWhereInput
    isNot?: OrderWhereInput
  }

  export type KotItemListRelationFilter = {
    every?: KotItemWhereInput
    some?: KotItemWhereInput
    none?: KotItemWhereInput
  }

  export type KotItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type KotTicketCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    kotNumber?: SortOrder
    status?: SortOrder
    printedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type KotTicketAvgOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
  }

  export type KotTicketMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    kotNumber?: SortOrder
    status?: SortOrder
    printedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type KotTicketMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    kotNumber?: SortOrder
    status?: SortOrder
    printedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type KotTicketSumOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type KotTicketRelationFilter = {
    is?: KotTicketWhereInput
    isNot?: KotTicketWhereInput
  }

  export type KotItemCountOrderByAggregateInput = {
    id?: SortOrder
    kotTicketId?: SortOrder
    orderItemId?: SortOrder
    menuItemId?: SortOrder
    name?: SortOrder
    quantity?: SortOrder
    note?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type KotItemAvgOrderByAggregateInput = {
    id?: SortOrder
    kotTicketId?: SortOrder
    orderItemId?: SortOrder
    menuItemId?: SortOrder
    quantity?: SortOrder
  }

  export type KotItemMaxOrderByAggregateInput = {
    id?: SortOrder
    kotTicketId?: SortOrder
    orderItemId?: SortOrder
    menuItemId?: SortOrder
    name?: SortOrder
    quantity?: SortOrder
    note?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type KotItemMinOrderByAggregateInput = {
    id?: SortOrder
    kotTicketId?: SortOrder
    orderItemId?: SortOrder
    menuItemId?: SortOrder
    name?: SortOrder
    quantity?: SortOrder
    note?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type KotItemSumOrderByAggregateInput = {
    id?: SortOrder
    kotTicketId?: SortOrder
    orderItemId?: SortOrder
    menuItemId?: SortOrder
    quantity?: SortOrder
  }

  export type BillSequenceCountOrderByAggregateInput = {
    id?: SortOrder
    businessDate?: SortOrder
    lastNumber?: SortOrder
    updatedAt?: SortOrder
  }

  export type BillSequenceAvgOrderByAggregateInput = {
    id?: SortOrder
    lastNumber?: SortOrder
  }

  export type BillSequenceMaxOrderByAggregateInput = {
    id?: SortOrder
    businessDate?: SortOrder
    lastNumber?: SortOrder
    updatedAt?: SortOrder
  }

  export type BillSequenceMinOrderByAggregateInput = {
    id?: SortOrder
    businessDate?: SortOrder
    lastNumber?: SortOrder
    updatedAt?: SortOrder
  }

  export type BillSequenceSumOrderByAggregateInput = {
    id?: SortOrder
    lastNumber?: SortOrder
  }

  export type MenuItemRelationFilter = {
    is?: MenuItemWhereInput
    isNot?: MenuItemWhereInput
  }

  export type OrderItemCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    menuItemId?: SortOrder
    name?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderItemAvgOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    menuItemId?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
  }

  export type OrderItemMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    menuItemId?: SortOrder
    name?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderItemMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    menuItemId?: SortOrder
    name?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
    createdAt?: SortOrder
  }

  export type OrderItemSumOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    menuItemId?: SortOrder
    price?: SortOrder
    quantity?: SortOrder
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    method?: SortOrder
    source?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    settledAmount?: SortOrder
    referenceId?: SortOrder
    settledAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    amount?: SortOrder
    settledAmount?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    method?: SortOrder
    source?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    settledAmount?: SortOrder
    referenceId?: SortOrder
    settledAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    method?: SortOrder
    source?: SortOrder
    status?: SortOrder
    amount?: SortOrder
    settledAmount?: SortOrder
    referenceId?: SortOrder
    settledAt?: SortOrder
    createdAt?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    amount?: SortOrder
    settledAmount?: SortOrder
  }

  export type ExpenseCountOrderByAggregateInput = {
    id?: SortOrder
    expenseDate?: SortOrder
    category?: SortOrder
    note?: SortOrder
    amount?: SortOrder
    paymentMethod?: SortOrder
    reference?: SortOrder
    createdAt?: SortOrder
  }

  export type ExpenseAvgOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
  }

  export type ExpenseMaxOrderByAggregateInput = {
    id?: SortOrder
    expenseDate?: SortOrder
    category?: SortOrder
    note?: SortOrder
    amount?: SortOrder
    paymentMethod?: SortOrder
    reference?: SortOrder
    createdAt?: SortOrder
  }

  export type ExpenseMinOrderByAggregateInput = {
    id?: SortOrder
    expenseDate?: SortOrder
    category?: SortOrder
    note?: SortOrder
    amount?: SortOrder
    paymentMethod?: SortOrder
    reference?: SortOrder
    createdAt?: SortOrder
  }

  export type ExpenseSumOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
  }

  export type PurchaseListRelationFilter = {
    every?: PurchaseWhereInput
    some?: PurchaseWhereInput
    none?: PurchaseWhereInput
  }

  export type PurchaseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SupplierCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type SupplierAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SupplierMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type SupplierMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type SupplierSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SupplierRelationFilter = {
    is?: SupplierWhereInput
    isNot?: SupplierWhereInput
  }

  export type PurchaseItemListRelationFilter = {
    every?: PurchaseItemWhereInput
    some?: PurchaseItemWhereInput
    none?: PurchaseItemWhereInput
  }

  export type PurchaseItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PurchaseCountOrderByAggregateInput = {
    id?: SortOrder
    supplierId?: SortOrder
    purchaseDate?: SortOrder
    invoiceNumber?: SortOrder
    paymentStatus?: SortOrder
    subtotal?: SortOrder
    taxAmount?: SortOrder
    discountAmount?: SortOrder
    totalAmount?: SortOrder
    paidAmount?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PurchaseAvgOrderByAggregateInput = {
    id?: SortOrder
    supplierId?: SortOrder
    subtotal?: SortOrder
    taxAmount?: SortOrder
    discountAmount?: SortOrder
    totalAmount?: SortOrder
    paidAmount?: SortOrder
  }

  export type PurchaseMaxOrderByAggregateInput = {
    id?: SortOrder
    supplierId?: SortOrder
    purchaseDate?: SortOrder
    invoiceNumber?: SortOrder
    paymentStatus?: SortOrder
    subtotal?: SortOrder
    taxAmount?: SortOrder
    discountAmount?: SortOrder
    totalAmount?: SortOrder
    paidAmount?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PurchaseMinOrderByAggregateInput = {
    id?: SortOrder
    supplierId?: SortOrder
    purchaseDate?: SortOrder
    invoiceNumber?: SortOrder
    paymentStatus?: SortOrder
    subtotal?: SortOrder
    taxAmount?: SortOrder
    discountAmount?: SortOrder
    totalAmount?: SortOrder
    paidAmount?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PurchaseSumOrderByAggregateInput = {
    id?: SortOrder
    supplierId?: SortOrder
    subtotal?: SortOrder
    taxAmount?: SortOrder
    discountAmount?: SortOrder
    totalAmount?: SortOrder
    paidAmount?: SortOrder
  }

  export type PurchaseRelationFilter = {
    is?: PurchaseWhereInput
    isNot?: PurchaseWhereInput
  }

  export type PurchaseItemCountOrderByAggregateInput = {
    id?: SortOrder
    purchaseId?: SortOrder
    itemName?: SortOrder
    quantity?: SortOrder
    unit?: SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrder
    createdAt?: SortOrder
  }

  export type PurchaseItemAvgOrderByAggregateInput = {
    id?: SortOrder
    purchaseId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrder
  }

  export type PurchaseItemMaxOrderByAggregateInput = {
    id?: SortOrder
    purchaseId?: SortOrder
    itemName?: SortOrder
    quantity?: SortOrder
    unit?: SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrder
    createdAt?: SortOrder
  }

  export type PurchaseItemMinOrderByAggregateInput = {
    id?: SortOrder
    purchaseId?: SortOrder
    itemName?: SortOrder
    quantity?: SortOrder
    unit?: SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrder
    createdAt?: SortOrder
  }

  export type PurchaseItemSumOrderByAggregateInput = {
    id?: SortOrder
    purchaseId?: SortOrder
    quantity?: SortOrder
    unitPrice?: SortOrder
    totalPrice?: SortOrder
  }

  export type StaffAttendanceCreateNestedManyWithoutUserInput = {
    create?: XOR<StaffAttendanceCreateWithoutUserInput, StaffAttendanceUncheckedCreateWithoutUserInput> | StaffAttendanceCreateWithoutUserInput[] | StaffAttendanceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StaffAttendanceCreateOrConnectWithoutUserInput | StaffAttendanceCreateOrConnectWithoutUserInput[]
    createMany?: StaffAttendanceCreateManyUserInputEnvelope
    connect?: StaffAttendanceWhereUniqueInput | StaffAttendanceWhereUniqueInput[]
  }

  export type StaffAttendanceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<StaffAttendanceCreateWithoutUserInput, StaffAttendanceUncheckedCreateWithoutUserInput> | StaffAttendanceCreateWithoutUserInput[] | StaffAttendanceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StaffAttendanceCreateOrConnectWithoutUserInput | StaffAttendanceCreateOrConnectWithoutUserInput[]
    createMany?: StaffAttendanceCreateManyUserInputEnvelope
    connect?: StaffAttendanceWhereUniqueInput | StaffAttendanceWhereUniqueInput[]
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

  export type StaffAttendanceUpdateManyWithoutUserNestedInput = {
    create?: XOR<StaffAttendanceCreateWithoutUserInput, StaffAttendanceUncheckedCreateWithoutUserInput> | StaffAttendanceCreateWithoutUserInput[] | StaffAttendanceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StaffAttendanceCreateOrConnectWithoutUserInput | StaffAttendanceCreateOrConnectWithoutUserInput[]
    upsert?: StaffAttendanceUpsertWithWhereUniqueWithoutUserInput | StaffAttendanceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: StaffAttendanceCreateManyUserInputEnvelope
    set?: StaffAttendanceWhereUniqueInput | StaffAttendanceWhereUniqueInput[]
    disconnect?: StaffAttendanceWhereUniqueInput | StaffAttendanceWhereUniqueInput[]
    delete?: StaffAttendanceWhereUniqueInput | StaffAttendanceWhereUniqueInput[]
    connect?: StaffAttendanceWhereUniqueInput | StaffAttendanceWhereUniqueInput[]
    update?: StaffAttendanceUpdateWithWhereUniqueWithoutUserInput | StaffAttendanceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: StaffAttendanceUpdateManyWithWhereWithoutUserInput | StaffAttendanceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: StaffAttendanceScalarWhereInput | StaffAttendanceScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StaffAttendanceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<StaffAttendanceCreateWithoutUserInput, StaffAttendanceUncheckedCreateWithoutUserInput> | StaffAttendanceCreateWithoutUserInput[] | StaffAttendanceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: StaffAttendanceCreateOrConnectWithoutUserInput | StaffAttendanceCreateOrConnectWithoutUserInput[]
    upsert?: StaffAttendanceUpsertWithWhereUniqueWithoutUserInput | StaffAttendanceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: StaffAttendanceCreateManyUserInputEnvelope
    set?: StaffAttendanceWhereUniqueInput | StaffAttendanceWhereUniqueInput[]
    disconnect?: StaffAttendanceWhereUniqueInput | StaffAttendanceWhereUniqueInput[]
    delete?: StaffAttendanceWhereUniqueInput | StaffAttendanceWhereUniqueInput[]
    connect?: StaffAttendanceWhereUniqueInput | StaffAttendanceWhereUniqueInput[]
    update?: StaffAttendanceUpdateWithWhereUniqueWithoutUserInput | StaffAttendanceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: StaffAttendanceUpdateManyWithWhereWithoutUserInput | StaffAttendanceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: StaffAttendanceScalarWhereInput | StaffAttendanceScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAttendancesInput = {
    create?: XOR<UserCreateWithoutAttendancesInput, UserUncheckedCreateWithoutAttendancesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAttendancesInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAttendancesNestedInput = {
    create?: XOR<UserCreateWithoutAttendancesInput, UserUncheckedCreateWithoutAttendancesInput>
    connectOrCreate?: UserCreateOrConnectWithoutAttendancesInput
    upsert?: UserUpsertWithoutAttendancesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAttendancesInput, UserUpdateWithoutAttendancesInput>, UserUncheckedUpdateWithoutAttendancesInput>
  }

  export type MenuItemCreateNestedManyWithoutCategoryInput = {
    create?: XOR<MenuItemCreateWithoutCategoryInput, MenuItemUncheckedCreateWithoutCategoryInput> | MenuItemCreateWithoutCategoryInput[] | MenuItemUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: MenuItemCreateOrConnectWithoutCategoryInput | MenuItemCreateOrConnectWithoutCategoryInput[]
    createMany?: MenuItemCreateManyCategoryInputEnvelope
    connect?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
  }

  export type MenuItemUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<MenuItemCreateWithoutCategoryInput, MenuItemUncheckedCreateWithoutCategoryInput> | MenuItemCreateWithoutCategoryInput[] | MenuItemUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: MenuItemCreateOrConnectWithoutCategoryInput | MenuItemCreateOrConnectWithoutCategoryInput[]
    createMany?: MenuItemCreateManyCategoryInputEnvelope
    connect?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type MenuItemUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<MenuItemCreateWithoutCategoryInput, MenuItemUncheckedCreateWithoutCategoryInput> | MenuItemCreateWithoutCategoryInput[] | MenuItemUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: MenuItemCreateOrConnectWithoutCategoryInput | MenuItemCreateOrConnectWithoutCategoryInput[]
    upsert?: MenuItemUpsertWithWhereUniqueWithoutCategoryInput | MenuItemUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: MenuItemCreateManyCategoryInputEnvelope
    set?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    disconnect?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    delete?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    connect?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    update?: MenuItemUpdateWithWhereUniqueWithoutCategoryInput | MenuItemUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: MenuItemUpdateManyWithWhereWithoutCategoryInput | MenuItemUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: MenuItemScalarWhereInput | MenuItemScalarWhereInput[]
  }

  export type MenuItemUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<MenuItemCreateWithoutCategoryInput, MenuItemUncheckedCreateWithoutCategoryInput> | MenuItemCreateWithoutCategoryInput[] | MenuItemUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: MenuItemCreateOrConnectWithoutCategoryInput | MenuItemCreateOrConnectWithoutCategoryInput[]
    upsert?: MenuItemUpsertWithWhereUniqueWithoutCategoryInput | MenuItemUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: MenuItemCreateManyCategoryInputEnvelope
    set?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    disconnect?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    delete?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    connect?: MenuItemWhereUniqueInput | MenuItemWhereUniqueInput[]
    update?: MenuItemUpdateWithWhereUniqueWithoutCategoryInput | MenuItemUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: MenuItemUpdateManyWithWhereWithoutCategoryInput | MenuItemUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: MenuItemScalarWhereInput | MenuItemScalarWhereInput[]
  }

  export type CategoryCreateNestedOneWithoutMenuItemsInput = {
    create?: XOR<CategoryCreateWithoutMenuItemsInput, CategoryUncheckedCreateWithoutMenuItemsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutMenuItemsInput
    connect?: CategoryWhereUniqueInput
  }

  export type OrderItemCreateNestedManyWithoutMenuItemInput = {
    create?: XOR<OrderItemCreateWithoutMenuItemInput, OrderItemUncheckedCreateWithoutMenuItemInput> | OrderItemCreateWithoutMenuItemInput[] | OrderItemUncheckedCreateWithoutMenuItemInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutMenuItemInput | OrderItemCreateOrConnectWithoutMenuItemInput[]
    createMany?: OrderItemCreateManyMenuItemInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type OrderItemUncheckedCreateNestedManyWithoutMenuItemInput = {
    create?: XOR<OrderItemCreateWithoutMenuItemInput, OrderItemUncheckedCreateWithoutMenuItemInput> | OrderItemCreateWithoutMenuItemInput[] | OrderItemUncheckedCreateWithoutMenuItemInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutMenuItemInput | OrderItemCreateOrConnectWithoutMenuItemInput[]
    createMany?: OrderItemCreateManyMenuItemInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type CategoryUpdateOneRequiredWithoutMenuItemsNestedInput = {
    create?: XOR<CategoryCreateWithoutMenuItemsInput, CategoryUncheckedCreateWithoutMenuItemsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutMenuItemsInput
    upsert?: CategoryUpsertWithoutMenuItemsInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutMenuItemsInput, CategoryUpdateWithoutMenuItemsInput>, CategoryUncheckedUpdateWithoutMenuItemsInput>
  }

  export type OrderItemUpdateManyWithoutMenuItemNestedInput = {
    create?: XOR<OrderItemCreateWithoutMenuItemInput, OrderItemUncheckedCreateWithoutMenuItemInput> | OrderItemCreateWithoutMenuItemInput[] | OrderItemUncheckedCreateWithoutMenuItemInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutMenuItemInput | OrderItemCreateOrConnectWithoutMenuItemInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutMenuItemInput | OrderItemUpsertWithWhereUniqueWithoutMenuItemInput[]
    createMany?: OrderItemCreateManyMenuItemInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutMenuItemInput | OrderItemUpdateWithWhereUniqueWithoutMenuItemInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutMenuItemInput | OrderItemUpdateManyWithWhereWithoutMenuItemInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderItemUncheckedUpdateManyWithoutMenuItemNestedInput = {
    create?: XOR<OrderItemCreateWithoutMenuItemInput, OrderItemUncheckedCreateWithoutMenuItemInput> | OrderItemCreateWithoutMenuItemInput[] | OrderItemUncheckedCreateWithoutMenuItemInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutMenuItemInput | OrderItemCreateOrConnectWithoutMenuItemInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutMenuItemInput | OrderItemUpsertWithWhereUniqueWithoutMenuItemInput[]
    createMany?: OrderItemCreateManyMenuItemInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutMenuItemInput | OrderItemUpdateWithWhereUniqueWithoutMenuItemInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutMenuItemInput | OrderItemUpdateManyWithWhereWithoutMenuItemInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type OrderItemCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type PaymentCreateNestedManyWithoutOrderInput = {
    create?: XOR<PaymentCreateWithoutOrderInput, PaymentUncheckedCreateWithoutOrderInput> | PaymentCreateWithoutOrderInput[] | PaymentUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutOrderInput | PaymentCreateOrConnectWithoutOrderInput[]
    createMany?: PaymentCreateManyOrderInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type KotTicketCreateNestedManyWithoutOrderInput = {
    create?: XOR<KotTicketCreateWithoutOrderInput, KotTicketUncheckedCreateWithoutOrderInput> | KotTicketCreateWithoutOrderInput[] | KotTicketUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: KotTicketCreateOrConnectWithoutOrderInput | KotTicketCreateOrConnectWithoutOrderInput[]
    createMany?: KotTicketCreateManyOrderInputEnvelope
    connect?: KotTicketWhereUniqueInput | KotTicketWhereUniqueInput[]
  }

  export type OrderItemUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<PaymentCreateWithoutOrderInput, PaymentUncheckedCreateWithoutOrderInput> | PaymentCreateWithoutOrderInput[] | PaymentUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutOrderInput | PaymentCreateOrConnectWithoutOrderInput[]
    createMany?: PaymentCreateManyOrderInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type KotTicketUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<KotTicketCreateWithoutOrderInput, KotTicketUncheckedCreateWithoutOrderInput> | KotTicketCreateWithoutOrderInput[] | KotTicketUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: KotTicketCreateOrConnectWithoutOrderInput | KotTicketCreateOrConnectWithoutOrderInput[]
    createMany?: KotTicketCreateManyOrderInputEnvelope
    connect?: KotTicketWhereUniqueInput | KotTicketWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type OrderItemUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type PaymentUpdateManyWithoutOrderNestedInput = {
    create?: XOR<PaymentCreateWithoutOrderInput, PaymentUncheckedCreateWithoutOrderInput> | PaymentCreateWithoutOrderInput[] | PaymentUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutOrderInput | PaymentCreateOrConnectWithoutOrderInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutOrderInput | PaymentUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: PaymentCreateManyOrderInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutOrderInput | PaymentUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutOrderInput | PaymentUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type KotTicketUpdateManyWithoutOrderNestedInput = {
    create?: XOR<KotTicketCreateWithoutOrderInput, KotTicketUncheckedCreateWithoutOrderInput> | KotTicketCreateWithoutOrderInput[] | KotTicketUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: KotTicketCreateOrConnectWithoutOrderInput | KotTicketCreateOrConnectWithoutOrderInput[]
    upsert?: KotTicketUpsertWithWhereUniqueWithoutOrderInput | KotTicketUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: KotTicketCreateManyOrderInputEnvelope
    set?: KotTicketWhereUniqueInput | KotTicketWhereUniqueInput[]
    disconnect?: KotTicketWhereUniqueInput | KotTicketWhereUniqueInput[]
    delete?: KotTicketWhereUniqueInput | KotTicketWhereUniqueInput[]
    connect?: KotTicketWhereUniqueInput | KotTicketWhereUniqueInput[]
    update?: KotTicketUpdateWithWhereUniqueWithoutOrderInput | KotTicketUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: KotTicketUpdateManyWithWhereWithoutOrderInput | KotTicketUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: KotTicketScalarWhereInput | KotTicketScalarWhereInput[]
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<PaymentCreateWithoutOrderInput, PaymentUncheckedCreateWithoutOrderInput> | PaymentCreateWithoutOrderInput[] | PaymentUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutOrderInput | PaymentCreateOrConnectWithoutOrderInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutOrderInput | PaymentUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: PaymentCreateManyOrderInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutOrderInput | PaymentUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutOrderInput | PaymentUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type KotTicketUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<KotTicketCreateWithoutOrderInput, KotTicketUncheckedCreateWithoutOrderInput> | KotTicketCreateWithoutOrderInput[] | KotTicketUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: KotTicketCreateOrConnectWithoutOrderInput | KotTicketCreateOrConnectWithoutOrderInput[]
    upsert?: KotTicketUpsertWithWhereUniqueWithoutOrderInput | KotTicketUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: KotTicketCreateManyOrderInputEnvelope
    set?: KotTicketWhereUniqueInput | KotTicketWhereUniqueInput[]
    disconnect?: KotTicketWhereUniqueInput | KotTicketWhereUniqueInput[]
    delete?: KotTicketWhereUniqueInput | KotTicketWhereUniqueInput[]
    connect?: KotTicketWhereUniqueInput | KotTicketWhereUniqueInput[]
    update?: KotTicketUpdateWithWhereUniqueWithoutOrderInput | KotTicketUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: KotTicketUpdateManyWithWhereWithoutOrderInput | KotTicketUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: KotTicketScalarWhereInput | KotTicketScalarWhereInput[]
  }

  export type OrderCreateNestedOneWithoutKotTicketsInput = {
    create?: XOR<OrderCreateWithoutKotTicketsInput, OrderUncheckedCreateWithoutKotTicketsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutKotTicketsInput
    connect?: OrderWhereUniqueInput
  }

  export type KotItemCreateNestedManyWithoutTicketInput = {
    create?: XOR<KotItemCreateWithoutTicketInput, KotItemUncheckedCreateWithoutTicketInput> | KotItemCreateWithoutTicketInput[] | KotItemUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: KotItemCreateOrConnectWithoutTicketInput | KotItemCreateOrConnectWithoutTicketInput[]
    createMany?: KotItemCreateManyTicketInputEnvelope
    connect?: KotItemWhereUniqueInput | KotItemWhereUniqueInput[]
  }

  export type KotItemUncheckedCreateNestedManyWithoutTicketInput = {
    create?: XOR<KotItemCreateWithoutTicketInput, KotItemUncheckedCreateWithoutTicketInput> | KotItemCreateWithoutTicketInput[] | KotItemUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: KotItemCreateOrConnectWithoutTicketInput | KotItemCreateOrConnectWithoutTicketInput[]
    createMany?: KotItemCreateManyTicketInputEnvelope
    connect?: KotItemWhereUniqueInput | KotItemWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type OrderUpdateOneRequiredWithoutKotTicketsNestedInput = {
    create?: XOR<OrderCreateWithoutKotTicketsInput, OrderUncheckedCreateWithoutKotTicketsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutKotTicketsInput
    upsert?: OrderUpsertWithoutKotTicketsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutKotTicketsInput, OrderUpdateWithoutKotTicketsInput>, OrderUncheckedUpdateWithoutKotTicketsInput>
  }

  export type KotItemUpdateManyWithoutTicketNestedInput = {
    create?: XOR<KotItemCreateWithoutTicketInput, KotItemUncheckedCreateWithoutTicketInput> | KotItemCreateWithoutTicketInput[] | KotItemUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: KotItemCreateOrConnectWithoutTicketInput | KotItemCreateOrConnectWithoutTicketInput[]
    upsert?: KotItemUpsertWithWhereUniqueWithoutTicketInput | KotItemUpsertWithWhereUniqueWithoutTicketInput[]
    createMany?: KotItemCreateManyTicketInputEnvelope
    set?: KotItemWhereUniqueInput | KotItemWhereUniqueInput[]
    disconnect?: KotItemWhereUniqueInput | KotItemWhereUniqueInput[]
    delete?: KotItemWhereUniqueInput | KotItemWhereUniqueInput[]
    connect?: KotItemWhereUniqueInput | KotItemWhereUniqueInput[]
    update?: KotItemUpdateWithWhereUniqueWithoutTicketInput | KotItemUpdateWithWhereUniqueWithoutTicketInput[]
    updateMany?: KotItemUpdateManyWithWhereWithoutTicketInput | KotItemUpdateManyWithWhereWithoutTicketInput[]
    deleteMany?: KotItemScalarWhereInput | KotItemScalarWhereInput[]
  }

  export type KotItemUncheckedUpdateManyWithoutTicketNestedInput = {
    create?: XOR<KotItemCreateWithoutTicketInput, KotItemUncheckedCreateWithoutTicketInput> | KotItemCreateWithoutTicketInput[] | KotItemUncheckedCreateWithoutTicketInput[]
    connectOrCreate?: KotItemCreateOrConnectWithoutTicketInput | KotItemCreateOrConnectWithoutTicketInput[]
    upsert?: KotItemUpsertWithWhereUniqueWithoutTicketInput | KotItemUpsertWithWhereUniqueWithoutTicketInput[]
    createMany?: KotItemCreateManyTicketInputEnvelope
    set?: KotItemWhereUniqueInput | KotItemWhereUniqueInput[]
    disconnect?: KotItemWhereUniqueInput | KotItemWhereUniqueInput[]
    delete?: KotItemWhereUniqueInput | KotItemWhereUniqueInput[]
    connect?: KotItemWhereUniqueInput | KotItemWhereUniqueInput[]
    update?: KotItemUpdateWithWhereUniqueWithoutTicketInput | KotItemUpdateWithWhereUniqueWithoutTicketInput[]
    updateMany?: KotItemUpdateManyWithWhereWithoutTicketInput | KotItemUpdateManyWithWhereWithoutTicketInput[]
    deleteMany?: KotItemScalarWhereInput | KotItemScalarWhereInput[]
  }

  export type KotTicketCreateNestedOneWithoutItemsInput = {
    create?: XOR<KotTicketCreateWithoutItemsInput, KotTicketUncheckedCreateWithoutItemsInput>
    connectOrCreate?: KotTicketCreateOrConnectWithoutItemsInput
    connect?: KotTicketWhereUniqueInput
  }

  export type KotTicketUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<KotTicketCreateWithoutItemsInput, KotTicketUncheckedCreateWithoutItemsInput>
    connectOrCreate?: KotTicketCreateOrConnectWithoutItemsInput
    upsert?: KotTicketUpsertWithoutItemsInput
    connect?: KotTicketWhereUniqueInput
    update?: XOR<XOR<KotTicketUpdateToOneWithWhereWithoutItemsInput, KotTicketUpdateWithoutItemsInput>, KotTicketUncheckedUpdateWithoutItemsInput>
  }

  export type OrderCreateNestedOneWithoutItemsInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    connect?: OrderWhereUniqueInput
  }

  export type MenuItemCreateNestedOneWithoutOrderItemsInput = {
    create?: XOR<MenuItemCreateWithoutOrderItemsInput, MenuItemUncheckedCreateWithoutOrderItemsInput>
    connectOrCreate?: MenuItemCreateOrConnectWithoutOrderItemsInput
    connect?: MenuItemWhereUniqueInput
  }

  export type OrderUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    upsert?: OrderUpsertWithoutItemsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutItemsInput, OrderUpdateWithoutItemsInput>, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type MenuItemUpdateOneRequiredWithoutOrderItemsNestedInput = {
    create?: XOR<MenuItemCreateWithoutOrderItemsInput, MenuItemUncheckedCreateWithoutOrderItemsInput>
    connectOrCreate?: MenuItemCreateOrConnectWithoutOrderItemsInput
    upsert?: MenuItemUpsertWithoutOrderItemsInput
    connect?: MenuItemWhereUniqueInput
    update?: XOR<XOR<MenuItemUpdateToOneWithWhereWithoutOrderItemsInput, MenuItemUpdateWithoutOrderItemsInput>, MenuItemUncheckedUpdateWithoutOrderItemsInput>
  }

  export type OrderCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<OrderCreateWithoutPaymentsInput, OrderUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutPaymentsInput
    connect?: OrderWhereUniqueInput
  }

  export type OrderUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<OrderCreateWithoutPaymentsInput, OrderUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutPaymentsInput
    upsert?: OrderUpsertWithoutPaymentsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutPaymentsInput, OrderUpdateWithoutPaymentsInput>, OrderUncheckedUpdateWithoutPaymentsInput>
  }

  export type PurchaseCreateNestedManyWithoutSupplierInput = {
    create?: XOR<PurchaseCreateWithoutSupplierInput, PurchaseUncheckedCreateWithoutSupplierInput> | PurchaseCreateWithoutSupplierInput[] | PurchaseUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: PurchaseCreateOrConnectWithoutSupplierInput | PurchaseCreateOrConnectWithoutSupplierInput[]
    createMany?: PurchaseCreateManySupplierInputEnvelope
    connect?: PurchaseWhereUniqueInput | PurchaseWhereUniqueInput[]
  }

  export type PurchaseUncheckedCreateNestedManyWithoutSupplierInput = {
    create?: XOR<PurchaseCreateWithoutSupplierInput, PurchaseUncheckedCreateWithoutSupplierInput> | PurchaseCreateWithoutSupplierInput[] | PurchaseUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: PurchaseCreateOrConnectWithoutSupplierInput | PurchaseCreateOrConnectWithoutSupplierInput[]
    createMany?: PurchaseCreateManySupplierInputEnvelope
    connect?: PurchaseWhereUniqueInput | PurchaseWhereUniqueInput[]
  }

  export type PurchaseUpdateManyWithoutSupplierNestedInput = {
    create?: XOR<PurchaseCreateWithoutSupplierInput, PurchaseUncheckedCreateWithoutSupplierInput> | PurchaseCreateWithoutSupplierInput[] | PurchaseUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: PurchaseCreateOrConnectWithoutSupplierInput | PurchaseCreateOrConnectWithoutSupplierInput[]
    upsert?: PurchaseUpsertWithWhereUniqueWithoutSupplierInput | PurchaseUpsertWithWhereUniqueWithoutSupplierInput[]
    createMany?: PurchaseCreateManySupplierInputEnvelope
    set?: PurchaseWhereUniqueInput | PurchaseWhereUniqueInput[]
    disconnect?: PurchaseWhereUniqueInput | PurchaseWhereUniqueInput[]
    delete?: PurchaseWhereUniqueInput | PurchaseWhereUniqueInput[]
    connect?: PurchaseWhereUniqueInput | PurchaseWhereUniqueInput[]
    update?: PurchaseUpdateWithWhereUniqueWithoutSupplierInput | PurchaseUpdateWithWhereUniqueWithoutSupplierInput[]
    updateMany?: PurchaseUpdateManyWithWhereWithoutSupplierInput | PurchaseUpdateManyWithWhereWithoutSupplierInput[]
    deleteMany?: PurchaseScalarWhereInput | PurchaseScalarWhereInput[]
  }

  export type PurchaseUncheckedUpdateManyWithoutSupplierNestedInput = {
    create?: XOR<PurchaseCreateWithoutSupplierInput, PurchaseUncheckedCreateWithoutSupplierInput> | PurchaseCreateWithoutSupplierInput[] | PurchaseUncheckedCreateWithoutSupplierInput[]
    connectOrCreate?: PurchaseCreateOrConnectWithoutSupplierInput | PurchaseCreateOrConnectWithoutSupplierInput[]
    upsert?: PurchaseUpsertWithWhereUniqueWithoutSupplierInput | PurchaseUpsertWithWhereUniqueWithoutSupplierInput[]
    createMany?: PurchaseCreateManySupplierInputEnvelope
    set?: PurchaseWhereUniqueInput | PurchaseWhereUniqueInput[]
    disconnect?: PurchaseWhereUniqueInput | PurchaseWhereUniqueInput[]
    delete?: PurchaseWhereUniqueInput | PurchaseWhereUniqueInput[]
    connect?: PurchaseWhereUniqueInput | PurchaseWhereUniqueInput[]
    update?: PurchaseUpdateWithWhereUniqueWithoutSupplierInput | PurchaseUpdateWithWhereUniqueWithoutSupplierInput[]
    updateMany?: PurchaseUpdateManyWithWhereWithoutSupplierInput | PurchaseUpdateManyWithWhereWithoutSupplierInput[]
    deleteMany?: PurchaseScalarWhereInput | PurchaseScalarWhereInput[]
  }

  export type SupplierCreateNestedOneWithoutPurchasesInput = {
    create?: XOR<SupplierCreateWithoutPurchasesInput, SupplierUncheckedCreateWithoutPurchasesInput>
    connectOrCreate?: SupplierCreateOrConnectWithoutPurchasesInput
    connect?: SupplierWhereUniqueInput
  }

  export type PurchaseItemCreateNestedManyWithoutPurchaseInput = {
    create?: XOR<PurchaseItemCreateWithoutPurchaseInput, PurchaseItemUncheckedCreateWithoutPurchaseInput> | PurchaseItemCreateWithoutPurchaseInput[] | PurchaseItemUncheckedCreateWithoutPurchaseInput[]
    connectOrCreate?: PurchaseItemCreateOrConnectWithoutPurchaseInput | PurchaseItemCreateOrConnectWithoutPurchaseInput[]
    createMany?: PurchaseItemCreateManyPurchaseInputEnvelope
    connect?: PurchaseItemWhereUniqueInput | PurchaseItemWhereUniqueInput[]
  }

  export type PurchaseItemUncheckedCreateNestedManyWithoutPurchaseInput = {
    create?: XOR<PurchaseItemCreateWithoutPurchaseInput, PurchaseItemUncheckedCreateWithoutPurchaseInput> | PurchaseItemCreateWithoutPurchaseInput[] | PurchaseItemUncheckedCreateWithoutPurchaseInput[]
    connectOrCreate?: PurchaseItemCreateOrConnectWithoutPurchaseInput | PurchaseItemCreateOrConnectWithoutPurchaseInput[]
    createMany?: PurchaseItemCreateManyPurchaseInputEnvelope
    connect?: PurchaseItemWhereUniqueInput | PurchaseItemWhereUniqueInput[]
  }

  export type SupplierUpdateOneRequiredWithoutPurchasesNestedInput = {
    create?: XOR<SupplierCreateWithoutPurchasesInput, SupplierUncheckedCreateWithoutPurchasesInput>
    connectOrCreate?: SupplierCreateOrConnectWithoutPurchasesInput
    upsert?: SupplierUpsertWithoutPurchasesInput
    connect?: SupplierWhereUniqueInput
    update?: XOR<XOR<SupplierUpdateToOneWithWhereWithoutPurchasesInput, SupplierUpdateWithoutPurchasesInput>, SupplierUncheckedUpdateWithoutPurchasesInput>
  }

  export type PurchaseItemUpdateManyWithoutPurchaseNestedInput = {
    create?: XOR<PurchaseItemCreateWithoutPurchaseInput, PurchaseItemUncheckedCreateWithoutPurchaseInput> | PurchaseItemCreateWithoutPurchaseInput[] | PurchaseItemUncheckedCreateWithoutPurchaseInput[]
    connectOrCreate?: PurchaseItemCreateOrConnectWithoutPurchaseInput | PurchaseItemCreateOrConnectWithoutPurchaseInput[]
    upsert?: PurchaseItemUpsertWithWhereUniqueWithoutPurchaseInput | PurchaseItemUpsertWithWhereUniqueWithoutPurchaseInput[]
    createMany?: PurchaseItemCreateManyPurchaseInputEnvelope
    set?: PurchaseItemWhereUniqueInput | PurchaseItemWhereUniqueInput[]
    disconnect?: PurchaseItemWhereUniqueInput | PurchaseItemWhereUniqueInput[]
    delete?: PurchaseItemWhereUniqueInput | PurchaseItemWhereUniqueInput[]
    connect?: PurchaseItemWhereUniqueInput | PurchaseItemWhereUniqueInput[]
    update?: PurchaseItemUpdateWithWhereUniqueWithoutPurchaseInput | PurchaseItemUpdateWithWhereUniqueWithoutPurchaseInput[]
    updateMany?: PurchaseItemUpdateManyWithWhereWithoutPurchaseInput | PurchaseItemUpdateManyWithWhereWithoutPurchaseInput[]
    deleteMany?: PurchaseItemScalarWhereInput | PurchaseItemScalarWhereInput[]
  }

  export type PurchaseItemUncheckedUpdateManyWithoutPurchaseNestedInput = {
    create?: XOR<PurchaseItemCreateWithoutPurchaseInput, PurchaseItemUncheckedCreateWithoutPurchaseInput> | PurchaseItemCreateWithoutPurchaseInput[] | PurchaseItemUncheckedCreateWithoutPurchaseInput[]
    connectOrCreate?: PurchaseItemCreateOrConnectWithoutPurchaseInput | PurchaseItemCreateOrConnectWithoutPurchaseInput[]
    upsert?: PurchaseItemUpsertWithWhereUniqueWithoutPurchaseInput | PurchaseItemUpsertWithWhereUniqueWithoutPurchaseInput[]
    createMany?: PurchaseItemCreateManyPurchaseInputEnvelope
    set?: PurchaseItemWhereUniqueInput | PurchaseItemWhereUniqueInput[]
    disconnect?: PurchaseItemWhereUniqueInput | PurchaseItemWhereUniqueInput[]
    delete?: PurchaseItemWhereUniqueInput | PurchaseItemWhereUniqueInput[]
    connect?: PurchaseItemWhereUniqueInput | PurchaseItemWhereUniqueInput[]
    update?: PurchaseItemUpdateWithWhereUniqueWithoutPurchaseInput | PurchaseItemUpdateWithWhereUniqueWithoutPurchaseInput[]
    updateMany?: PurchaseItemUpdateManyWithWhereWithoutPurchaseInput | PurchaseItemUpdateManyWithWhereWithoutPurchaseInput[]
    deleteMany?: PurchaseItemScalarWhereInput | PurchaseItemScalarWhereInput[]
  }

  export type PurchaseCreateNestedOneWithoutItemsInput = {
    create?: XOR<PurchaseCreateWithoutItemsInput, PurchaseUncheckedCreateWithoutItemsInput>
    connectOrCreate?: PurchaseCreateOrConnectWithoutItemsInput
    connect?: PurchaseWhereUniqueInput
  }

  export type PurchaseUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<PurchaseCreateWithoutItemsInput, PurchaseUncheckedCreateWithoutItemsInput>
    connectOrCreate?: PurchaseCreateOrConnectWithoutItemsInput
    upsert?: PurchaseUpsertWithoutItemsInput
    connect?: PurchaseWhereUniqueInput
    update?: XOR<XOR<PurchaseUpdateToOneWithWhereWithoutItemsInput, PurchaseUpdateWithoutItemsInput>, PurchaseUncheckedUpdateWithoutItemsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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
    in?: string[] | null
    notIn?: string[] | null
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
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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
    in?: string[] | null
    notIn?: string[] | null
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
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
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

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
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

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StaffAttendanceCreateWithoutUserInput = {
    attendanceDate: string
    status: string
    checkIn?: string | null
    checkOut?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StaffAttendanceUncheckedCreateWithoutUserInput = {
    id?: number
    attendanceDate: string
    status: string
    checkIn?: string | null
    checkOut?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StaffAttendanceCreateOrConnectWithoutUserInput = {
    where: StaffAttendanceWhereUniqueInput
    create: XOR<StaffAttendanceCreateWithoutUserInput, StaffAttendanceUncheckedCreateWithoutUserInput>
  }

  export type StaffAttendanceCreateManyUserInputEnvelope = {
    data: StaffAttendanceCreateManyUserInput | StaffAttendanceCreateManyUserInput[]
  }

  export type StaffAttendanceUpsertWithWhereUniqueWithoutUserInput = {
    where: StaffAttendanceWhereUniqueInput
    update: XOR<StaffAttendanceUpdateWithoutUserInput, StaffAttendanceUncheckedUpdateWithoutUserInput>
    create: XOR<StaffAttendanceCreateWithoutUserInput, StaffAttendanceUncheckedCreateWithoutUserInput>
  }

  export type StaffAttendanceUpdateWithWhereUniqueWithoutUserInput = {
    where: StaffAttendanceWhereUniqueInput
    data: XOR<StaffAttendanceUpdateWithoutUserInput, StaffAttendanceUncheckedUpdateWithoutUserInput>
  }

  export type StaffAttendanceUpdateManyWithWhereWithoutUserInput = {
    where: StaffAttendanceScalarWhereInput
    data: XOR<StaffAttendanceUpdateManyMutationInput, StaffAttendanceUncheckedUpdateManyWithoutUserInput>
  }

  export type StaffAttendanceScalarWhereInput = {
    AND?: StaffAttendanceScalarWhereInput | StaffAttendanceScalarWhereInput[]
    OR?: StaffAttendanceScalarWhereInput[]
    NOT?: StaffAttendanceScalarWhereInput | StaffAttendanceScalarWhereInput[]
    id?: IntFilter<"StaffAttendance"> | number
    userId?: IntFilter<"StaffAttendance"> | number
    attendanceDate?: StringFilter<"StaffAttendance"> | string
    status?: StringFilter<"StaffAttendance"> | string
    checkIn?: StringNullableFilter<"StaffAttendance"> | string | null
    checkOut?: StringNullableFilter<"StaffAttendance"> | string | null
    notes?: StringNullableFilter<"StaffAttendance"> | string | null
    createdAt?: DateTimeFilter<"StaffAttendance"> | Date | string
    updatedAt?: DateTimeFilter<"StaffAttendance"> | Date | string
  }

  export type UserCreateWithoutAttendancesInput = {
    name: string
    role: string
    password: string
    featureAccessOverrides?: string | null
    createdAt?: Date | string
  }

  export type UserUncheckedCreateWithoutAttendancesInput = {
    id?: number
    name: string
    role: string
    password: string
    featureAccessOverrides?: string | null
    createdAt?: Date | string
  }

  export type UserCreateOrConnectWithoutAttendancesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAttendancesInput, UserUncheckedCreateWithoutAttendancesInput>
  }

  export type UserUpsertWithoutAttendancesInput = {
    update: XOR<UserUpdateWithoutAttendancesInput, UserUncheckedUpdateWithoutAttendancesInput>
    create: XOR<UserCreateWithoutAttendancesInput, UserUncheckedCreateWithoutAttendancesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAttendancesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAttendancesInput, UserUncheckedUpdateWithoutAttendancesInput>
  }

  export type UserUpdateWithoutAttendancesInput = {
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    featureAccessOverrides?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutAttendancesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    featureAccessOverrides?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenuItemCreateWithoutCategoryInput = {
    name: string
    price: Decimal | DecimalJsLike | number | string
    isAvailable?: boolean
    imageUrl?: string | null
    isDeleted?: boolean
    createdAt?: Date | string
    orderItems?: OrderItemCreateNestedManyWithoutMenuItemInput
  }

  export type MenuItemUncheckedCreateWithoutCategoryInput = {
    id?: number
    name: string
    price: Decimal | DecimalJsLike | number | string
    isAvailable?: boolean
    imageUrl?: string | null
    isDeleted?: boolean
    createdAt?: Date | string
    orderItems?: OrderItemUncheckedCreateNestedManyWithoutMenuItemInput
  }

  export type MenuItemCreateOrConnectWithoutCategoryInput = {
    where: MenuItemWhereUniqueInput
    create: XOR<MenuItemCreateWithoutCategoryInput, MenuItemUncheckedCreateWithoutCategoryInput>
  }

  export type MenuItemCreateManyCategoryInputEnvelope = {
    data: MenuItemCreateManyCategoryInput | MenuItemCreateManyCategoryInput[]
  }

  export type MenuItemUpsertWithWhereUniqueWithoutCategoryInput = {
    where: MenuItemWhereUniqueInput
    update: XOR<MenuItemUpdateWithoutCategoryInput, MenuItemUncheckedUpdateWithoutCategoryInput>
    create: XOR<MenuItemCreateWithoutCategoryInput, MenuItemUncheckedCreateWithoutCategoryInput>
  }

  export type MenuItemUpdateWithWhereUniqueWithoutCategoryInput = {
    where: MenuItemWhereUniqueInput
    data: XOR<MenuItemUpdateWithoutCategoryInput, MenuItemUncheckedUpdateWithoutCategoryInput>
  }

  export type MenuItemUpdateManyWithWhereWithoutCategoryInput = {
    where: MenuItemScalarWhereInput
    data: XOR<MenuItemUpdateManyMutationInput, MenuItemUncheckedUpdateManyWithoutCategoryInput>
  }

  export type MenuItemScalarWhereInput = {
    AND?: MenuItemScalarWhereInput | MenuItemScalarWhereInput[]
    OR?: MenuItemScalarWhereInput[]
    NOT?: MenuItemScalarWhereInput | MenuItemScalarWhereInput[]
    id?: IntFilter<"MenuItem"> | number
    name?: StringFilter<"MenuItem"> | string
    price?: DecimalFilter<"MenuItem"> | Decimal | DecimalJsLike | number | string
    categoryId?: IntFilter<"MenuItem"> | number
    isAvailable?: BoolFilter<"MenuItem"> | boolean
    imageUrl?: StringNullableFilter<"MenuItem"> | string | null
    isDeleted?: BoolFilter<"MenuItem"> | boolean
    createdAt?: DateTimeFilter<"MenuItem"> | Date | string
  }

  export type CategoryCreateWithoutMenuItemsInput = {
    name: string
    isDeleted?: boolean
    createdAt?: Date | string
  }

  export type CategoryUncheckedCreateWithoutMenuItemsInput = {
    id?: number
    name: string
    isDeleted?: boolean
    createdAt?: Date | string
  }

  export type CategoryCreateOrConnectWithoutMenuItemsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutMenuItemsInput, CategoryUncheckedCreateWithoutMenuItemsInput>
  }

  export type OrderItemCreateWithoutMenuItemInput = {
    name: string
    price: Decimal | DecimalJsLike | number | string
    quantity: number
    createdAt?: Date | string
    order: OrderCreateNestedOneWithoutItemsInput
  }

  export type OrderItemUncheckedCreateWithoutMenuItemInput = {
    id?: number
    orderId: number
    name: string
    price: Decimal | DecimalJsLike | number | string
    quantity: number
    createdAt?: Date | string
  }

  export type OrderItemCreateOrConnectWithoutMenuItemInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutMenuItemInput, OrderItemUncheckedCreateWithoutMenuItemInput>
  }

  export type OrderItemCreateManyMenuItemInputEnvelope = {
    data: OrderItemCreateManyMenuItemInput | OrderItemCreateManyMenuItemInput[]
  }

  export type CategoryUpsertWithoutMenuItemsInput = {
    update: XOR<CategoryUpdateWithoutMenuItemsInput, CategoryUncheckedUpdateWithoutMenuItemsInput>
    create: XOR<CategoryCreateWithoutMenuItemsInput, CategoryUncheckedCreateWithoutMenuItemsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutMenuItemsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutMenuItemsInput, CategoryUncheckedUpdateWithoutMenuItemsInput>
  }

  export type CategoryUpdateWithoutMenuItemsInput = {
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateWithoutMenuItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemUpsertWithWhereUniqueWithoutMenuItemInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutMenuItemInput, OrderItemUncheckedUpdateWithoutMenuItemInput>
    create: XOR<OrderItemCreateWithoutMenuItemInput, OrderItemUncheckedCreateWithoutMenuItemInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutMenuItemInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutMenuItemInput, OrderItemUncheckedUpdateWithoutMenuItemInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutMenuItemInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutMenuItemInput>
  }

  export type OrderItemScalarWhereInput = {
    AND?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    OR?: OrderItemScalarWhereInput[]
    NOT?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    id?: IntFilter<"OrderItem"> | number
    orderId?: IntFilter<"OrderItem"> | number
    menuItemId?: IntFilter<"OrderItem"> | number
    name?: StringFilter<"OrderItem"> | string
    price?: DecimalFilter<"OrderItem"> | Decimal | DecimalJsLike | number | string
    quantity?: IntFilter<"OrderItem"> | number
    createdAt?: DateTimeFilter<"OrderItem"> | Date | string
  }

  export type OrderItemCreateWithoutOrderInput = {
    name: string
    price: Decimal | DecimalJsLike | number | string
    quantity: number
    createdAt?: Date | string
    menuItem: MenuItemCreateNestedOneWithoutOrderItemsInput
  }

  export type OrderItemUncheckedCreateWithoutOrderInput = {
    id?: number
    menuItemId: number
    name: string
    price: Decimal | DecimalJsLike | number | string
    quantity: number
    createdAt?: Date | string
  }

  export type OrderItemCreateOrConnectWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemCreateManyOrderInputEnvelope = {
    data: OrderItemCreateManyOrderInput | OrderItemCreateManyOrderInput[]
  }

  export type PaymentCreateWithoutOrderInput = {
    method: string
    source?: string
    status?: string
    amount: Decimal | DecimalJsLike | number | string
    settledAmount?: Decimal | DecimalJsLike | number | string
    referenceId?: string | null
    settledAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PaymentUncheckedCreateWithoutOrderInput = {
    id?: number
    method: string
    source?: string
    status?: string
    amount: Decimal | DecimalJsLike | number | string
    settledAmount?: Decimal | DecimalJsLike | number | string
    referenceId?: string | null
    settledAt?: Date | string | null
    createdAt?: Date | string
  }

  export type PaymentCreateOrConnectWithoutOrderInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutOrderInput, PaymentUncheckedCreateWithoutOrderInput>
  }

  export type PaymentCreateManyOrderInputEnvelope = {
    data: PaymentCreateManyOrderInput | PaymentCreateManyOrderInput[]
  }

  export type KotTicketCreateWithoutOrderInput = {
    kotNumber: string
    status?: string
    printedAt?: Date | string | null
    createdAt?: Date | string
    items?: KotItemCreateNestedManyWithoutTicketInput
  }

  export type KotTicketUncheckedCreateWithoutOrderInput = {
    id?: number
    kotNumber: string
    status?: string
    printedAt?: Date | string | null
    createdAt?: Date | string
    items?: KotItemUncheckedCreateNestedManyWithoutTicketInput
  }

  export type KotTicketCreateOrConnectWithoutOrderInput = {
    where: KotTicketWhereUniqueInput
    create: XOR<KotTicketCreateWithoutOrderInput, KotTicketUncheckedCreateWithoutOrderInput>
  }

  export type KotTicketCreateManyOrderInputEnvelope = {
    data: KotTicketCreateManyOrderInput | KotTicketCreateManyOrderInput[]
  }

  export type OrderItemUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutOrderInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutOrderInput>
  }

  export type PaymentUpsertWithWhereUniqueWithoutOrderInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutOrderInput, PaymentUncheckedUpdateWithoutOrderInput>
    create: XOR<PaymentCreateWithoutOrderInput, PaymentUncheckedCreateWithoutOrderInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutOrderInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutOrderInput, PaymentUncheckedUpdateWithoutOrderInput>
  }

  export type PaymentUpdateManyWithWhereWithoutOrderInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutOrderInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    OR?: PaymentScalarWhereInput[]
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    id?: IntFilter<"Payment"> | number
    orderId?: IntFilter<"Payment"> | number
    method?: StringFilter<"Payment"> | string
    source?: StringFilter<"Payment"> | string
    status?: StringFilter<"Payment"> | string
    amount?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    settledAmount?: DecimalFilter<"Payment"> | Decimal | DecimalJsLike | number | string
    referenceId?: StringNullableFilter<"Payment"> | string | null
    settledAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
  }

  export type KotTicketUpsertWithWhereUniqueWithoutOrderInput = {
    where: KotTicketWhereUniqueInput
    update: XOR<KotTicketUpdateWithoutOrderInput, KotTicketUncheckedUpdateWithoutOrderInput>
    create: XOR<KotTicketCreateWithoutOrderInput, KotTicketUncheckedCreateWithoutOrderInput>
  }

  export type KotTicketUpdateWithWhereUniqueWithoutOrderInput = {
    where: KotTicketWhereUniqueInput
    data: XOR<KotTicketUpdateWithoutOrderInput, KotTicketUncheckedUpdateWithoutOrderInput>
  }

  export type KotTicketUpdateManyWithWhereWithoutOrderInput = {
    where: KotTicketScalarWhereInput
    data: XOR<KotTicketUpdateManyMutationInput, KotTicketUncheckedUpdateManyWithoutOrderInput>
  }

  export type KotTicketScalarWhereInput = {
    AND?: KotTicketScalarWhereInput | KotTicketScalarWhereInput[]
    OR?: KotTicketScalarWhereInput[]
    NOT?: KotTicketScalarWhereInput | KotTicketScalarWhereInput[]
    id?: IntFilter<"KotTicket"> | number
    orderId?: IntFilter<"KotTicket"> | number
    kotNumber?: StringFilter<"KotTicket"> | string
    status?: StringFilter<"KotTicket"> | string
    printedAt?: DateTimeNullableFilter<"KotTicket"> | Date | string | null
    createdAt?: DateTimeFilter<"KotTicket"> | Date | string
  }

  export type OrderCreateWithoutKotTicketsInput = {
    billNumber: string
    status?: string
    paymentStatus?: string
    customerName?: string | null
    customerPhone?: string | null
    tableId?: number | null
    orderType?: string
    subtotal?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    taxAmount?: Decimal | DecimalJsLike | number | string
    finalAmount?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemCreateNestedManyWithoutOrderInput
    payments?: PaymentCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutKotTicketsInput = {
    id?: number
    billNumber: string
    status?: string
    paymentStatus?: string
    customerName?: string | null
    customerPhone?: string | null
    tableId?: number | null
    orderType?: string
    subtotal?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    taxAmount?: Decimal | DecimalJsLike | number | string
    finalAmount?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    payments?: PaymentUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutKotTicketsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutKotTicketsInput, OrderUncheckedCreateWithoutKotTicketsInput>
  }

  export type KotItemCreateWithoutTicketInput = {
    orderItemId?: number | null
    menuItemId: number
    name: string
    quantity: number
    note?: string | null
    status?: string
    createdAt?: Date | string
  }

  export type KotItemUncheckedCreateWithoutTicketInput = {
    id?: number
    orderItemId?: number | null
    menuItemId: number
    name: string
    quantity: number
    note?: string | null
    status?: string
    createdAt?: Date | string
  }

  export type KotItemCreateOrConnectWithoutTicketInput = {
    where: KotItemWhereUniqueInput
    create: XOR<KotItemCreateWithoutTicketInput, KotItemUncheckedCreateWithoutTicketInput>
  }

  export type KotItemCreateManyTicketInputEnvelope = {
    data: KotItemCreateManyTicketInput | KotItemCreateManyTicketInput[]
  }

  export type OrderUpsertWithoutKotTicketsInput = {
    update: XOR<OrderUpdateWithoutKotTicketsInput, OrderUncheckedUpdateWithoutKotTicketsInput>
    create: XOR<OrderCreateWithoutKotTicketsInput, OrderUncheckedCreateWithoutKotTicketsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutKotTicketsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutKotTicketsInput, OrderUncheckedUpdateWithoutKotTicketsInput>
  }

  export type OrderUpdateWithoutKotTicketsInput = {
    billNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    tableId?: NullableIntFieldUpdateOperationsInput | number | null
    orderType?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    finalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    payments?: PaymentUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutKotTicketsInput = {
    id?: IntFieldUpdateOperationsInput | number
    billNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    tableId?: NullableIntFieldUpdateOperationsInput | number | null
    orderType?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    finalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type KotItemUpsertWithWhereUniqueWithoutTicketInput = {
    where: KotItemWhereUniqueInput
    update: XOR<KotItemUpdateWithoutTicketInput, KotItemUncheckedUpdateWithoutTicketInput>
    create: XOR<KotItemCreateWithoutTicketInput, KotItemUncheckedCreateWithoutTicketInput>
  }

  export type KotItemUpdateWithWhereUniqueWithoutTicketInput = {
    where: KotItemWhereUniqueInput
    data: XOR<KotItemUpdateWithoutTicketInput, KotItemUncheckedUpdateWithoutTicketInput>
  }

  export type KotItemUpdateManyWithWhereWithoutTicketInput = {
    where: KotItemScalarWhereInput
    data: XOR<KotItemUpdateManyMutationInput, KotItemUncheckedUpdateManyWithoutTicketInput>
  }

  export type KotItemScalarWhereInput = {
    AND?: KotItemScalarWhereInput | KotItemScalarWhereInput[]
    OR?: KotItemScalarWhereInput[]
    NOT?: KotItemScalarWhereInput | KotItemScalarWhereInput[]
    id?: IntFilter<"KotItem"> | number
    kotTicketId?: IntFilter<"KotItem"> | number
    orderItemId?: IntNullableFilter<"KotItem"> | number | null
    menuItemId?: IntFilter<"KotItem"> | number
    name?: StringFilter<"KotItem"> | string
    quantity?: IntFilter<"KotItem"> | number
    note?: StringNullableFilter<"KotItem"> | string | null
    status?: StringFilter<"KotItem"> | string
    createdAt?: DateTimeFilter<"KotItem"> | Date | string
  }

  export type KotTicketCreateWithoutItemsInput = {
    kotNumber: string
    status?: string
    printedAt?: Date | string | null
    createdAt?: Date | string
    order: OrderCreateNestedOneWithoutKotTicketsInput
  }

  export type KotTicketUncheckedCreateWithoutItemsInput = {
    id?: number
    orderId: number
    kotNumber: string
    status?: string
    printedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type KotTicketCreateOrConnectWithoutItemsInput = {
    where: KotTicketWhereUniqueInput
    create: XOR<KotTicketCreateWithoutItemsInput, KotTicketUncheckedCreateWithoutItemsInput>
  }

  export type KotTicketUpsertWithoutItemsInput = {
    update: XOR<KotTicketUpdateWithoutItemsInput, KotTicketUncheckedUpdateWithoutItemsInput>
    create: XOR<KotTicketCreateWithoutItemsInput, KotTicketUncheckedCreateWithoutItemsInput>
    where?: KotTicketWhereInput
  }

  export type KotTicketUpdateToOneWithWhereWithoutItemsInput = {
    where?: KotTicketWhereInput
    data: XOR<KotTicketUpdateWithoutItemsInput, KotTicketUncheckedUpdateWithoutItemsInput>
  }

  export type KotTicketUpdateWithoutItemsInput = {
    kotNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    printedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutKotTicketsNestedInput
  }

  export type KotTicketUncheckedUpdateWithoutItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    kotNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    printedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateWithoutItemsInput = {
    billNumber: string
    status?: string
    paymentStatus?: string
    customerName?: string | null
    customerPhone?: string | null
    tableId?: number | null
    orderType?: string
    subtotal?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    taxAmount?: Decimal | DecimalJsLike | number | string
    finalAmount?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    payments?: PaymentCreateNestedManyWithoutOrderInput
    kotTickets?: KotTicketCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutItemsInput = {
    id?: number
    billNumber: string
    status?: string
    paymentStatus?: string
    customerName?: string | null
    customerPhone?: string | null
    tableId?: number | null
    orderType?: string
    subtotal?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    taxAmount?: Decimal | DecimalJsLike | number | string
    finalAmount?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    payments?: PaymentUncheckedCreateNestedManyWithoutOrderInput
    kotTickets?: KotTicketUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutItemsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
  }

  export type MenuItemCreateWithoutOrderItemsInput = {
    name: string
    price: Decimal | DecimalJsLike | number | string
    isAvailable?: boolean
    imageUrl?: string | null
    isDeleted?: boolean
    createdAt?: Date | string
    category: CategoryCreateNestedOneWithoutMenuItemsInput
  }

  export type MenuItemUncheckedCreateWithoutOrderItemsInput = {
    id?: number
    name: string
    price: Decimal | DecimalJsLike | number | string
    categoryId: number
    isAvailable?: boolean
    imageUrl?: string | null
    isDeleted?: boolean
    createdAt?: Date | string
  }

  export type MenuItemCreateOrConnectWithoutOrderItemsInput = {
    where: MenuItemWhereUniqueInput
    create: XOR<MenuItemCreateWithoutOrderItemsInput, MenuItemUncheckedCreateWithoutOrderItemsInput>
  }

  export type OrderUpsertWithoutItemsInput = {
    update: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutItemsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type OrderUpdateWithoutItemsInput = {
    billNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    tableId?: NullableIntFieldUpdateOperationsInput | number | null
    orderType?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    finalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PaymentUpdateManyWithoutOrderNestedInput
    kotTickets?: KotTicketUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    billNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    tableId?: NullableIntFieldUpdateOperationsInput | number | null
    orderType?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    finalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PaymentUncheckedUpdateManyWithoutOrderNestedInput
    kotTickets?: KotTicketUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type MenuItemUpsertWithoutOrderItemsInput = {
    update: XOR<MenuItemUpdateWithoutOrderItemsInput, MenuItemUncheckedUpdateWithoutOrderItemsInput>
    create: XOR<MenuItemCreateWithoutOrderItemsInput, MenuItemUncheckedCreateWithoutOrderItemsInput>
    where?: MenuItemWhereInput
  }

  export type MenuItemUpdateToOneWithWhereWithoutOrderItemsInput = {
    where?: MenuItemWhereInput
    data: XOR<MenuItemUpdateWithoutOrderItemsInput, MenuItemUncheckedUpdateWithoutOrderItemsInput>
  }

  export type MenuItemUpdateWithoutOrderItemsInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutMenuItemsNestedInput
  }

  export type MenuItemUncheckedUpdateWithoutOrderItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    categoryId?: IntFieldUpdateOperationsInput | number
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateWithoutPaymentsInput = {
    billNumber: string
    status?: string
    paymentStatus?: string
    customerName?: string | null
    customerPhone?: string | null
    tableId?: number | null
    orderType?: string
    subtotal?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    taxAmount?: Decimal | DecimalJsLike | number | string
    finalAmount?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemCreateNestedManyWithoutOrderInput
    kotTickets?: KotTicketCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutPaymentsInput = {
    id?: number
    billNumber: string
    status?: string
    paymentStatus?: string
    customerName?: string | null
    customerPhone?: string | null
    tableId?: number | null
    orderType?: string
    subtotal?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    taxAmount?: Decimal | DecimalJsLike | number | string
    finalAmount?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
    kotTickets?: KotTicketUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutPaymentsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutPaymentsInput, OrderUncheckedCreateWithoutPaymentsInput>
  }

  export type OrderUpsertWithoutPaymentsInput = {
    update: XOR<OrderUpdateWithoutPaymentsInput, OrderUncheckedUpdateWithoutPaymentsInput>
    create: XOR<OrderCreateWithoutPaymentsInput, OrderUncheckedCreateWithoutPaymentsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutPaymentsInput, OrderUncheckedUpdateWithoutPaymentsInput>
  }

  export type OrderUpdateWithoutPaymentsInput = {
    billNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    tableId?: NullableIntFieldUpdateOperationsInput | number | null
    orderType?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    finalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    kotTickets?: KotTicketUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutPaymentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    billNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    paymentStatus?: StringFieldUpdateOperationsInput | string
    customerName?: NullableStringFieldUpdateOperationsInput | string | null
    customerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    tableId?: NullableIntFieldUpdateOperationsInput | number | null
    orderType?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    finalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
    kotTickets?: KotTicketUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type PurchaseCreateWithoutSupplierInput = {
    purchaseDate: Date | string
    invoiceNumber?: string | null
    paymentStatus?: string
    subtotal?: Decimal | DecimalJsLike | number | string
    taxAmount?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    totalAmount?: Decimal | DecimalJsLike | number | string
    paidAmount?: Decimal | DecimalJsLike | number | string
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: PurchaseItemCreateNestedManyWithoutPurchaseInput
  }

  export type PurchaseUncheckedCreateWithoutSupplierInput = {
    id?: number
    purchaseDate: Date | string
    invoiceNumber?: string | null
    paymentStatus?: string
    subtotal?: Decimal | DecimalJsLike | number | string
    taxAmount?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    totalAmount?: Decimal | DecimalJsLike | number | string
    paidAmount?: Decimal | DecimalJsLike | number | string
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: PurchaseItemUncheckedCreateNestedManyWithoutPurchaseInput
  }

  export type PurchaseCreateOrConnectWithoutSupplierInput = {
    where: PurchaseWhereUniqueInput
    create: XOR<PurchaseCreateWithoutSupplierInput, PurchaseUncheckedCreateWithoutSupplierInput>
  }

  export type PurchaseCreateManySupplierInputEnvelope = {
    data: PurchaseCreateManySupplierInput | PurchaseCreateManySupplierInput[]
  }

  export type PurchaseUpsertWithWhereUniqueWithoutSupplierInput = {
    where: PurchaseWhereUniqueInput
    update: XOR<PurchaseUpdateWithoutSupplierInput, PurchaseUncheckedUpdateWithoutSupplierInput>
    create: XOR<PurchaseCreateWithoutSupplierInput, PurchaseUncheckedCreateWithoutSupplierInput>
  }

  export type PurchaseUpdateWithWhereUniqueWithoutSupplierInput = {
    where: PurchaseWhereUniqueInput
    data: XOR<PurchaseUpdateWithoutSupplierInput, PurchaseUncheckedUpdateWithoutSupplierInput>
  }

  export type PurchaseUpdateManyWithWhereWithoutSupplierInput = {
    where: PurchaseScalarWhereInput
    data: XOR<PurchaseUpdateManyMutationInput, PurchaseUncheckedUpdateManyWithoutSupplierInput>
  }

  export type PurchaseScalarWhereInput = {
    AND?: PurchaseScalarWhereInput | PurchaseScalarWhereInput[]
    OR?: PurchaseScalarWhereInput[]
    NOT?: PurchaseScalarWhereInput | PurchaseScalarWhereInput[]
    id?: IntFilter<"Purchase"> | number
    supplierId?: IntFilter<"Purchase"> | number
    purchaseDate?: DateTimeFilter<"Purchase"> | Date | string
    invoiceNumber?: StringNullableFilter<"Purchase"> | string | null
    paymentStatus?: StringFilter<"Purchase"> | string
    subtotal?: DecimalFilter<"Purchase"> | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFilter<"Purchase"> | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFilter<"Purchase"> | Decimal | DecimalJsLike | number | string
    totalAmount?: DecimalFilter<"Purchase"> | Decimal | DecimalJsLike | number | string
    paidAmount?: DecimalFilter<"Purchase"> | Decimal | DecimalJsLike | number | string
    note?: StringNullableFilter<"Purchase"> | string | null
    createdAt?: DateTimeFilter<"Purchase"> | Date | string
    updatedAt?: DateTimeFilter<"Purchase"> | Date | string
  }

  export type SupplierCreateWithoutPurchasesInput = {
    name: string
    phone?: string | null
    email?: string | null
    address?: string | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type SupplierUncheckedCreateWithoutPurchasesInput = {
    id?: number
    name: string
    phone?: string | null
    email?: string | null
    address?: string | null
    notes?: string | null
    createdAt?: Date | string
  }

  export type SupplierCreateOrConnectWithoutPurchasesInput = {
    where: SupplierWhereUniqueInput
    create: XOR<SupplierCreateWithoutPurchasesInput, SupplierUncheckedCreateWithoutPurchasesInput>
  }

  export type PurchaseItemCreateWithoutPurchaseInput = {
    itemName: string
    quantity: Decimal | DecimalJsLike | number | string
    unit?: string | null
    unitPrice: Decimal | DecimalJsLike | number | string
    totalPrice: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type PurchaseItemUncheckedCreateWithoutPurchaseInput = {
    id?: number
    itemName: string
    quantity: Decimal | DecimalJsLike | number | string
    unit?: string | null
    unitPrice: Decimal | DecimalJsLike | number | string
    totalPrice: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type PurchaseItemCreateOrConnectWithoutPurchaseInput = {
    where: PurchaseItemWhereUniqueInput
    create: XOR<PurchaseItemCreateWithoutPurchaseInput, PurchaseItemUncheckedCreateWithoutPurchaseInput>
  }

  export type PurchaseItemCreateManyPurchaseInputEnvelope = {
    data: PurchaseItemCreateManyPurchaseInput | PurchaseItemCreateManyPurchaseInput[]
  }

  export type SupplierUpsertWithoutPurchasesInput = {
    update: XOR<SupplierUpdateWithoutPurchasesInput, SupplierUncheckedUpdateWithoutPurchasesInput>
    create: XOR<SupplierCreateWithoutPurchasesInput, SupplierUncheckedCreateWithoutPurchasesInput>
    where?: SupplierWhereInput
  }

  export type SupplierUpdateToOneWithWhereWithoutPurchasesInput = {
    where?: SupplierWhereInput
    data: XOR<SupplierUpdateWithoutPurchasesInput, SupplierUncheckedUpdateWithoutPurchasesInput>
  }

  export type SupplierUpdateWithoutPurchasesInput = {
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SupplierUncheckedUpdateWithoutPurchasesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseItemUpsertWithWhereUniqueWithoutPurchaseInput = {
    where: PurchaseItemWhereUniqueInput
    update: XOR<PurchaseItemUpdateWithoutPurchaseInput, PurchaseItemUncheckedUpdateWithoutPurchaseInput>
    create: XOR<PurchaseItemCreateWithoutPurchaseInput, PurchaseItemUncheckedCreateWithoutPurchaseInput>
  }

  export type PurchaseItemUpdateWithWhereUniqueWithoutPurchaseInput = {
    where: PurchaseItemWhereUniqueInput
    data: XOR<PurchaseItemUpdateWithoutPurchaseInput, PurchaseItemUncheckedUpdateWithoutPurchaseInput>
  }

  export type PurchaseItemUpdateManyWithWhereWithoutPurchaseInput = {
    where: PurchaseItemScalarWhereInput
    data: XOR<PurchaseItemUpdateManyMutationInput, PurchaseItemUncheckedUpdateManyWithoutPurchaseInput>
  }

  export type PurchaseItemScalarWhereInput = {
    AND?: PurchaseItemScalarWhereInput | PurchaseItemScalarWhereInput[]
    OR?: PurchaseItemScalarWhereInput[]
    NOT?: PurchaseItemScalarWhereInput | PurchaseItemScalarWhereInput[]
    id?: IntFilter<"PurchaseItem"> | number
    purchaseId?: IntFilter<"PurchaseItem"> | number
    itemName?: StringFilter<"PurchaseItem"> | string
    quantity?: DecimalFilter<"PurchaseItem"> | Decimal | DecimalJsLike | number | string
    unit?: StringNullableFilter<"PurchaseItem"> | string | null
    unitPrice?: DecimalFilter<"PurchaseItem"> | Decimal | DecimalJsLike | number | string
    totalPrice?: DecimalFilter<"PurchaseItem"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"PurchaseItem"> | Date | string
  }

  export type PurchaseCreateWithoutItemsInput = {
    purchaseDate: Date | string
    invoiceNumber?: string | null
    paymentStatus?: string
    subtotal?: Decimal | DecimalJsLike | number | string
    taxAmount?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    totalAmount?: Decimal | DecimalJsLike | number | string
    paidAmount?: Decimal | DecimalJsLike | number | string
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    supplier: SupplierCreateNestedOneWithoutPurchasesInput
  }

  export type PurchaseUncheckedCreateWithoutItemsInput = {
    id?: number
    supplierId: number
    purchaseDate: Date | string
    invoiceNumber?: string | null
    paymentStatus?: string
    subtotal?: Decimal | DecimalJsLike | number | string
    taxAmount?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    totalAmount?: Decimal | DecimalJsLike | number | string
    paidAmount?: Decimal | DecimalJsLike | number | string
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PurchaseCreateOrConnectWithoutItemsInput = {
    where: PurchaseWhereUniqueInput
    create: XOR<PurchaseCreateWithoutItemsInput, PurchaseUncheckedCreateWithoutItemsInput>
  }

  export type PurchaseUpsertWithoutItemsInput = {
    update: XOR<PurchaseUpdateWithoutItemsInput, PurchaseUncheckedUpdateWithoutItemsInput>
    create: XOR<PurchaseCreateWithoutItemsInput, PurchaseUncheckedCreateWithoutItemsInput>
    where?: PurchaseWhereInput
  }

  export type PurchaseUpdateToOneWithWhereWithoutItemsInput = {
    where?: PurchaseWhereInput
    data: XOR<PurchaseUpdateWithoutItemsInput, PurchaseUncheckedUpdateWithoutItemsInput>
  }

  export type PurchaseUpdateWithoutItemsInput = {
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paidAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    supplier?: SupplierUpdateOneRequiredWithoutPurchasesNestedInput
  }

  export type PurchaseUncheckedUpdateWithoutItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    supplierId?: IntFieldUpdateOperationsInput | number
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paidAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffAttendanceCreateManyUserInput = {
    id?: number
    attendanceDate: string
    status: string
    checkIn?: string | null
    checkOut?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StaffAttendanceUpdateWithoutUserInput = {
    attendanceDate?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    checkIn?: NullableStringFieldUpdateOperationsInput | string | null
    checkOut?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffAttendanceUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    attendanceDate?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    checkIn?: NullableStringFieldUpdateOperationsInput | string | null
    checkOut?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffAttendanceUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    attendanceDate?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    checkIn?: NullableStringFieldUpdateOperationsInput | string | null
    checkOut?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenuItemCreateManyCategoryInput = {
    id?: number
    name: string
    price: Decimal | DecimalJsLike | number | string
    isAvailable?: boolean
    imageUrl?: string | null
    isDeleted?: boolean
    createdAt?: Date | string
  }

  export type MenuItemUpdateWithoutCategoryInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderItems?: OrderItemUpdateManyWithoutMenuItemNestedInput
  }

  export type MenuItemUncheckedUpdateWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orderItems?: OrderItemUncheckedUpdateManyWithoutMenuItemNestedInput
  }

  export type MenuItemUncheckedUpdateManyWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isDeleted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemCreateManyMenuItemInput = {
    id?: number
    orderId: number
    name: string
    price: Decimal | DecimalJsLike | number | string
    quantity: number
    createdAt?: Date | string
  }

  export type OrderItemUpdateWithoutMenuItemInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutMenuItemInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemUncheckedUpdateManyWithoutMenuItemInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemCreateManyOrderInput = {
    id?: number
    menuItemId: number
    name: string
    price: Decimal | DecimalJsLike | number | string
    quantity: number
    createdAt?: Date | string
  }

  export type PaymentCreateManyOrderInput = {
    id?: number
    method: string
    source?: string
    status?: string
    amount: Decimal | DecimalJsLike | number | string
    settledAmount?: Decimal | DecimalJsLike | number | string
    referenceId?: string | null
    settledAt?: Date | string | null
    createdAt?: Date | string
  }

  export type KotTicketCreateManyOrderInput = {
    id?: number
    kotNumber: string
    status?: string
    printedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type OrderItemUpdateWithoutOrderInput = {
    name?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    menuItem?: MenuItemUpdateOneRequiredWithoutOrderItemsNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutOrderInput = {
    id?: IntFieldUpdateOperationsInput | number
    menuItemId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderInput = {
    id?: IntFieldUpdateOperationsInput | number
    menuItemId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    quantity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUpdateWithoutOrderInput = {
    method?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    settledAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateWithoutOrderInput = {
    id?: IntFieldUpdateOperationsInput | number
    method?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    settledAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyWithoutOrderInput = {
    id?: IntFieldUpdateOperationsInput | number
    method?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    settledAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    referenceId?: NullableStringFieldUpdateOperationsInput | string | null
    settledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KotTicketUpdateWithoutOrderInput = {
    kotNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    printedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: KotItemUpdateManyWithoutTicketNestedInput
  }

  export type KotTicketUncheckedUpdateWithoutOrderInput = {
    id?: IntFieldUpdateOperationsInput | number
    kotNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    printedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: KotItemUncheckedUpdateManyWithoutTicketNestedInput
  }

  export type KotTicketUncheckedUpdateManyWithoutOrderInput = {
    id?: IntFieldUpdateOperationsInput | number
    kotNumber?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    printedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KotItemCreateManyTicketInput = {
    id?: number
    orderItemId?: number | null
    menuItemId: number
    name: string
    quantity: number
    note?: string | null
    status?: string
    createdAt?: Date | string
  }

  export type KotItemUpdateWithoutTicketInput = {
    orderItemId?: NullableIntFieldUpdateOperationsInput | number | null
    menuItemId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KotItemUncheckedUpdateWithoutTicketInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderItemId?: NullableIntFieldUpdateOperationsInput | number | null
    menuItemId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KotItemUncheckedUpdateManyWithoutTicketInput = {
    id?: IntFieldUpdateOperationsInput | number
    orderItemId?: NullableIntFieldUpdateOperationsInput | number | null
    menuItemId?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseCreateManySupplierInput = {
    id?: number
    purchaseDate: Date | string
    invoiceNumber?: string | null
    paymentStatus?: string
    subtotal?: Decimal | DecimalJsLike | number | string
    taxAmount?: Decimal | DecimalJsLike | number | string
    discountAmount?: Decimal | DecimalJsLike | number | string
    totalAmount?: Decimal | DecimalJsLike | number | string
    paidAmount?: Decimal | DecimalJsLike | number | string
    note?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PurchaseUpdateWithoutSupplierInput = {
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paidAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: PurchaseItemUpdateManyWithoutPurchaseNestedInput
  }

  export type PurchaseUncheckedUpdateWithoutSupplierInput = {
    id?: IntFieldUpdateOperationsInput | number
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paidAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: PurchaseItemUncheckedUpdateManyWithoutPurchaseNestedInput
  }

  export type PurchaseUncheckedUpdateManyWithoutSupplierInput = {
    id?: IntFieldUpdateOperationsInput | number
    purchaseDate?: DateTimeFieldUpdateOperationsInput | Date | string
    invoiceNumber?: NullableStringFieldUpdateOperationsInput | string | null
    paymentStatus?: StringFieldUpdateOperationsInput | string
    subtotal?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    taxAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    discountAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    paidAmount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseItemCreateManyPurchaseInput = {
    id?: number
    itemName: string
    quantity: Decimal | DecimalJsLike | number | string
    unit?: string | null
    unitPrice: Decimal | DecimalJsLike | number | string
    totalPrice: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
  }

  export type PurchaseItemUpdateWithoutPurchaseInput = {
    itemName?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseItemUncheckedUpdateWithoutPurchaseInput = {
    id?: IntFieldUpdateOperationsInput | number
    itemName?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PurchaseItemUncheckedUpdateManyWithoutPurchaseInput = {
    id?: IntFieldUpdateOperationsInput | number
    itemName?: StringFieldUpdateOperationsInput | string
    quantity?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    unit?: NullableStringFieldUpdateOperationsInput | string | null
    unitPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
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
     * @deprecated Use CategoryCountOutputTypeDefaultArgs instead
     */
    export type CategoryCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CategoryCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MenuItemCountOutputTypeDefaultArgs instead
     */
    export type MenuItemCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MenuItemCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OrderCountOutputTypeDefaultArgs instead
     */
    export type OrderCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OrderCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use KotTicketCountOutputTypeDefaultArgs instead
     */
    export type KotTicketCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = KotTicketCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SupplierCountOutputTypeDefaultArgs instead
     */
    export type SupplierCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SupplierCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PurchaseCountOutputTypeDefaultArgs instead
     */
    export type PurchaseCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PurchaseCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StaffAttendanceDefaultArgs instead
     */
    export type StaffAttendanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StaffAttendanceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CategoryDefaultArgs instead
     */
    export type CategoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CategoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MenuItemDefaultArgs instead
     */
    export type MenuItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MenuItemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OrderDefaultArgs instead
     */
    export type OrderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OrderDefaultArgs<ExtArgs>
    /**
     * @deprecated Use KotTicketDefaultArgs instead
     */
    export type KotTicketArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = KotTicketDefaultArgs<ExtArgs>
    /**
     * @deprecated Use KotItemDefaultArgs instead
     */
    export type KotItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = KotItemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BillSequenceDefaultArgs instead
     */
    export type BillSequenceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BillSequenceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OrderItemDefaultArgs instead
     */
    export type OrderItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OrderItemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PaymentDefaultArgs instead
     */
    export type PaymentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PaymentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ExpenseDefaultArgs instead
     */
    export type ExpenseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ExpenseDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SupplierDefaultArgs instead
     */
    export type SupplierArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SupplierDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PurchaseDefaultArgs instead
     */
    export type PurchaseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PurchaseDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PurchaseItemDefaultArgs instead
     */
    export type PurchaseItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PurchaseItemDefaultArgs<ExtArgs>

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