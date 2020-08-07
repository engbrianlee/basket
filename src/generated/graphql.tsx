import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '../lib/apollo/apolloHooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  json: any;
  timestamptz: any;
  uuid: any;
};

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: Maybe<Scalars['Boolean']>;
  _gt?: Maybe<Scalars['Boolean']>;
  _gte?: Maybe<Scalars['Boolean']>;
  _in?: Maybe<Array<Scalars['Boolean']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Boolean']>;
  _lte?: Maybe<Scalars['Boolean']>;
  _neq?: Maybe<Scalars['Boolean']>;
  _nin?: Maybe<Array<Scalars['Boolean']>>;
};

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: Maybe<Scalars['Int']>;
  _gt?: Maybe<Scalars['Int']>;
  _gte?: Maybe<Scalars['Int']>;
  _in?: Maybe<Array<Scalars['Int']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Int']>;
  _lte?: Maybe<Scalars['Int']>;
  _neq?: Maybe<Scalars['Int']>;
  _nin?: Maybe<Array<Scalars['Int']>>;
};

export type JoinShoppingListOutput = {
  __typename?: 'JoinShoppingListOutput';
  shopping_list_id: Scalars['uuid'];
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};

/** columns and relationships of "chat_messages" */
export type Chat_Messages = {
  __typename?: 'chat_messages';
  created_at: Scalars['timestamptz'];
  created_by: Scalars['String'];
  /** An object relationship */
  creator: Users;
  id: Scalars['uuid'];
  message: Scalars['String'];
  /** An object relationship */
  shopping_list_item: Shopping_List_Items;
  shopping_list_item_id: Scalars['uuid'];
};

/** aggregated selection of "chat_messages" */
export type Chat_Messages_Aggregate = {
  __typename?: 'chat_messages_aggregate';
  aggregate?: Maybe<Chat_Messages_Aggregate_Fields>;
  nodes: Array<Chat_Messages>;
};

/** aggregate fields of "chat_messages" */
export type Chat_Messages_Aggregate_Fields = {
  __typename?: 'chat_messages_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Chat_Messages_Max_Fields>;
  min?: Maybe<Chat_Messages_Min_Fields>;
};


/** aggregate fields of "chat_messages" */
export type Chat_Messages_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Chat_Messages_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "chat_messages" */
export type Chat_Messages_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Chat_Messages_Max_Order_By>;
  min?: Maybe<Chat_Messages_Min_Order_By>;
};

/** input type for inserting array relation for remote table "chat_messages" */
export type Chat_Messages_Arr_Rel_Insert_Input = {
  data: Array<Chat_Messages_Insert_Input>;
  on_conflict?: Maybe<Chat_Messages_On_Conflict>;
};

/** Boolean expression to filter rows from the table "chat_messages". All fields are combined with a logical 'AND'. */
export type Chat_Messages_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Chat_Messages_Bool_Exp>>>;
  _not?: Maybe<Chat_Messages_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Chat_Messages_Bool_Exp>>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  created_by?: Maybe<String_Comparison_Exp>;
  creator?: Maybe<Users_Bool_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  message?: Maybe<String_Comparison_Exp>;
  shopping_list_item?: Maybe<Shopping_List_Items_Bool_Exp>;
  shopping_list_item_id?: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "chat_messages" */
export enum Chat_Messages_Constraint {
  /** unique or primary key constraint */
  ChatMessagesPkey = 'chat_messages_pkey'
}

/** input type for inserting data into table "chat_messages" */
export type Chat_Messages_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  created_by?: Maybe<Scalars['String']>;
  creator?: Maybe<Users_Obj_Rel_Insert_Input>;
  id?: Maybe<Scalars['uuid']>;
  message?: Maybe<Scalars['String']>;
  shopping_list_item?: Maybe<Shopping_List_Items_Obj_Rel_Insert_Input>;
  shopping_list_item_id?: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Chat_Messages_Max_Fields = {
  __typename?: 'chat_messages_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  created_by?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  message?: Maybe<Scalars['String']>;
  shopping_list_item_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "chat_messages" */
export type Chat_Messages_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  created_by?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  message?: Maybe<Order_By>;
  shopping_list_item_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Chat_Messages_Min_Fields = {
  __typename?: 'chat_messages_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  created_by?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  message?: Maybe<Scalars['String']>;
  shopping_list_item_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "chat_messages" */
export type Chat_Messages_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  created_by?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  message?: Maybe<Order_By>;
  shopping_list_item_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "chat_messages" */
export type Chat_Messages_Mutation_Response = {
  __typename?: 'chat_messages_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Chat_Messages>;
};

/** input type for inserting object relation for remote table "chat_messages" */
export type Chat_Messages_Obj_Rel_Insert_Input = {
  data: Chat_Messages_Insert_Input;
  on_conflict?: Maybe<Chat_Messages_On_Conflict>;
};

/** on conflict condition type for table "chat_messages" */
export type Chat_Messages_On_Conflict = {
  constraint: Chat_Messages_Constraint;
  update_columns: Array<Chat_Messages_Update_Column>;
  where?: Maybe<Chat_Messages_Bool_Exp>;
};

/** ordering options when selecting data from "chat_messages" */
export type Chat_Messages_Order_By = {
  created_at?: Maybe<Order_By>;
  created_by?: Maybe<Order_By>;
  creator?: Maybe<Users_Order_By>;
  id?: Maybe<Order_By>;
  message?: Maybe<Order_By>;
  shopping_list_item?: Maybe<Shopping_List_Items_Order_By>;
  shopping_list_item_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "chat_messages" */
export type Chat_Messages_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "chat_messages" */
export enum Chat_Messages_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedBy = 'created_by',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  ShoppingListItemId = 'shopping_list_item_id'
}

/** input type for updating data in table "chat_messages" */
export type Chat_Messages_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  created_by?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  message?: Maybe<Scalars['String']>;
  shopping_list_item_id?: Maybe<Scalars['uuid']>;
};

/** update columns of table "chat_messages" */
export enum Chat_Messages_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedBy = 'created_by',
  /** column name */
  Id = 'id',
  /** column name */
  Message = 'message',
  /** column name */
  ShoppingListItemId = 'shopping_list_item_id'
}

/** columns and relationships of "current_user" */
export type Current_User = {
  __typename?: 'current_user';
  id?: Maybe<Scalars['String']>;
  /** An object relationship */
  user?: Maybe<Users>;
};

/** aggregated selection of "current_user" */
export type Current_User_Aggregate = {
  __typename?: 'current_user_aggregate';
  aggregate?: Maybe<Current_User_Aggregate_Fields>;
  nodes: Array<Current_User>;
};

/** aggregate fields of "current_user" */
export type Current_User_Aggregate_Fields = {
  __typename?: 'current_user_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Current_User_Max_Fields>;
  min?: Maybe<Current_User_Min_Fields>;
};


/** aggregate fields of "current_user" */
export type Current_User_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Current_User_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "current_user" */
export type Current_User_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Current_User_Max_Order_By>;
  min?: Maybe<Current_User_Min_Order_By>;
};

/** input type for inserting array relation for remote table "current_user" */
export type Current_User_Arr_Rel_Insert_Input = {
  data: Array<Current_User_Insert_Input>;
};

/** Boolean expression to filter rows from the table "current_user". All fields are combined with a logical 'AND'. */
export type Current_User_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Current_User_Bool_Exp>>>;
  _not?: Maybe<Current_User_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Current_User_Bool_Exp>>>;
  id?: Maybe<String_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
};

/** input type for inserting data into table "current_user" */
export type Current_User_Insert_Input = {
  id?: Maybe<Scalars['String']>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Current_User_Max_Fields = {
  __typename?: 'current_user_max_fields';
  id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "current_user" */
export type Current_User_Max_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Current_User_Min_Fields = {
  __typename?: 'current_user_min_fields';
  id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "current_user" */
export type Current_User_Min_Order_By = {
  id?: Maybe<Order_By>;
};

/** response of any mutation on the table "current_user" */
export type Current_User_Mutation_Response = {
  __typename?: 'current_user_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Current_User>;
};

/** input type for inserting object relation for remote table "current_user" */
export type Current_User_Obj_Rel_Insert_Input = {
  data: Current_User_Insert_Input;
};

/** ordering options when selecting data from "current_user" */
export type Current_User_Order_By = {
  id?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
};

/** select columns of table "current_user" */
export enum Current_User_Select_Column {
  /** column name */
  Id = 'id'
}

/** input type for updating data in table "current_user" */
export type Current_User_Set_Input = {
  id?: Maybe<Scalars['String']>;
};


/** expression to compare columns of type json. All fields are combined with logical 'AND'. */
export type Json_Comparison_Exp = {
  _eq?: Maybe<Scalars['json']>;
  _gt?: Maybe<Scalars['json']>;
  _gte?: Maybe<Scalars['json']>;
  _in?: Maybe<Array<Scalars['json']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['json']>;
  _lte?: Maybe<Scalars['json']>;
  _neq?: Maybe<Scalars['json']>;
  _nin?: Maybe<Array<Scalars['json']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "chat_messages" */
  delete_chat_messages?: Maybe<Chat_Messages_Mutation_Response>;
  /** delete single row from the table: "chat_messages" */
  delete_chat_messages_by_pk?: Maybe<Chat_Messages>;
  /** delete data from the table: "current_user" */
  delete_current_user?: Maybe<Current_User_Mutation_Response>;
  /** delete data from the table: "private_user_data" */
  delete_private_user_data?: Maybe<Private_User_Data_Mutation_Response>;
  /** delete data from the table: "shopping_list_active_users" */
  delete_shopping_list_active_users?: Maybe<Shopping_List_Active_Users_Mutation_Response>;
  /** delete single row from the table: "shopping_list_active_users" */
  delete_shopping_list_active_users_by_pk?: Maybe<Shopping_List_Active_Users>;
  /** delete data from the table: "shopping_list_items" */
  delete_shopping_list_items?: Maybe<Shopping_List_Items_Mutation_Response>;
  /** delete single row from the table: "shopping_list_items" */
  delete_shopping_list_items_by_pk?: Maybe<Shopping_List_Items>;
  /** delete data from the table: "shopping_lists" */
  delete_shopping_lists?: Maybe<Shopping_Lists_Mutation_Response>;
  /** delete single row from the table: "shopping_lists" */
  delete_shopping_lists_by_pk?: Maybe<Shopping_Lists>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** insert data into the table: "chat_messages" */
  insert_chat_messages?: Maybe<Chat_Messages_Mutation_Response>;
  /** insert a single row into the table: "chat_messages" */
  insert_chat_messages_one?: Maybe<Chat_Messages>;
  /** insert data into the table: "current_user" */
  insert_current_user?: Maybe<Current_User_Mutation_Response>;
  /** insert a single row into the table: "current_user" */
  insert_current_user_one?: Maybe<Current_User>;
  /** insert data into the table: "private_user_data" */
  insert_private_user_data?: Maybe<Private_User_Data_Mutation_Response>;
  /** insert a single row into the table: "private_user_data" */
  insert_private_user_data_one?: Maybe<Private_User_Data>;
  /** insert data into the table: "shopping_list_active_users" */
  insert_shopping_list_active_users?: Maybe<Shopping_List_Active_Users_Mutation_Response>;
  /** insert a single row into the table: "shopping_list_active_users" */
  insert_shopping_list_active_users_one?: Maybe<Shopping_List_Active_Users>;
  /** insert data into the table: "shopping_list_items" */
  insert_shopping_list_items?: Maybe<Shopping_List_Items_Mutation_Response>;
  /** insert a single row into the table: "shopping_list_items" */
  insert_shopping_list_items_one?: Maybe<Shopping_List_Items>;
  /** insert data into the table: "shopping_lists" */
  insert_shopping_lists?: Maybe<Shopping_Lists_Mutation_Response>;
  /** insert a single row into the table: "shopping_lists" */
  insert_shopping_lists_one?: Maybe<Shopping_Lists>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** perform the action: "join_shopping_list" */
  join_shopping_list?: Maybe<JoinShoppingListOutput>;
  /** update data of the table: "chat_messages" */
  update_chat_messages?: Maybe<Chat_Messages_Mutation_Response>;
  /** update single row of the table: "chat_messages" */
  update_chat_messages_by_pk?: Maybe<Chat_Messages>;
  /** update data of the table: "current_user" */
  update_current_user?: Maybe<Current_User_Mutation_Response>;
  /** update data of the table: "private_user_data" */
  update_private_user_data?: Maybe<Private_User_Data_Mutation_Response>;
  /** update data of the table: "shopping_list_active_users" */
  update_shopping_list_active_users?: Maybe<Shopping_List_Active_Users_Mutation_Response>;
  /** update single row of the table: "shopping_list_active_users" */
  update_shopping_list_active_users_by_pk?: Maybe<Shopping_List_Active_Users>;
  /** update data of the table: "shopping_list_items" */
  update_shopping_list_items?: Maybe<Shopping_List_Items_Mutation_Response>;
  /** update single row of the table: "shopping_list_items" */
  update_shopping_list_items_by_pk?: Maybe<Shopping_List_Items>;
  /** update data of the table: "shopping_lists" */
  update_shopping_lists?: Maybe<Shopping_Lists_Mutation_Response>;
  /** update single row of the table: "shopping_lists" */
  update_shopping_lists_by_pk?: Maybe<Shopping_Lists>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
};


/** mutation root */
export type Mutation_RootDelete_Chat_MessagesArgs = {
  where: Chat_Messages_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Chat_Messages_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Current_UserArgs = {
  where: Current_User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Private_User_DataArgs = {
  where: Private_User_Data_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Shopping_List_Active_UsersArgs = {
  where: Shopping_List_Active_Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Shopping_List_Active_Users_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Shopping_List_ItemsArgs = {
  where: Shopping_List_Items_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Shopping_List_Items_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Shopping_ListsArgs = {
  where: Shopping_Lists_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Shopping_Lists_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootInsert_Chat_MessagesArgs = {
  objects: Array<Chat_Messages_Insert_Input>;
  on_conflict?: Maybe<Chat_Messages_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Chat_Messages_OneArgs = {
  object: Chat_Messages_Insert_Input;
  on_conflict?: Maybe<Chat_Messages_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Current_UserArgs = {
  objects: Array<Current_User_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Current_User_OneArgs = {
  object: Current_User_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_Private_User_DataArgs = {
  objects: Array<Private_User_Data_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Private_User_Data_OneArgs = {
  object: Private_User_Data_Insert_Input;
};


/** mutation root */
export type Mutation_RootInsert_Shopping_List_Active_UsersArgs = {
  objects: Array<Shopping_List_Active_Users_Insert_Input>;
  on_conflict?: Maybe<Shopping_List_Active_Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Shopping_List_Active_Users_OneArgs = {
  object: Shopping_List_Active_Users_Insert_Input;
  on_conflict?: Maybe<Shopping_List_Active_Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Shopping_List_ItemsArgs = {
  objects: Array<Shopping_List_Items_Insert_Input>;
  on_conflict?: Maybe<Shopping_List_Items_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Shopping_List_Items_OneArgs = {
  object: Shopping_List_Items_Insert_Input;
  on_conflict?: Maybe<Shopping_List_Items_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Shopping_ListsArgs = {
  objects: Array<Shopping_Lists_Insert_Input>;
  on_conflict?: Maybe<Shopping_Lists_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Shopping_Lists_OneArgs = {
  object: Shopping_Lists_Insert_Input;
  on_conflict?: Maybe<Shopping_Lists_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootJoin_Shopping_ListArgs = {
  shopping_list_id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootUpdate_Chat_MessagesArgs = {
  _set?: Maybe<Chat_Messages_Set_Input>;
  where: Chat_Messages_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Chat_Messages_By_PkArgs = {
  _set?: Maybe<Chat_Messages_Set_Input>;
  pk_columns: Chat_Messages_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Current_UserArgs = {
  _set?: Maybe<Current_User_Set_Input>;
  where: Current_User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Private_User_DataArgs = {
  _set?: Maybe<Private_User_Data_Set_Input>;
  where: Private_User_Data_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Shopping_List_Active_UsersArgs = {
  _inc?: Maybe<Shopping_List_Active_Users_Inc_Input>;
  _set?: Maybe<Shopping_List_Active_Users_Set_Input>;
  where: Shopping_List_Active_Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Shopping_List_Active_Users_By_PkArgs = {
  _inc?: Maybe<Shopping_List_Active_Users_Inc_Input>;
  _set?: Maybe<Shopping_List_Active_Users_Set_Input>;
  pk_columns: Shopping_List_Active_Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Shopping_List_ItemsArgs = {
  _set?: Maybe<Shopping_List_Items_Set_Input>;
  where: Shopping_List_Items_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Shopping_List_Items_By_PkArgs = {
  _set?: Maybe<Shopping_List_Items_Set_Input>;
  pk_columns: Shopping_List_Items_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Shopping_ListsArgs = {
  _set?: Maybe<Shopping_Lists_Set_Input>;
  where: Shopping_Lists_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Shopping_Lists_By_PkArgs = {
  _set?: Maybe<Shopping_Lists_Set_Input>;
  pk_columns: Shopping_Lists_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: Maybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: Maybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "private_user_data" */
export type Private_User_Data = {
  __typename?: 'private_user_data';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

/** aggregated selection of "private_user_data" */
export type Private_User_Data_Aggregate = {
  __typename?: 'private_user_data_aggregate';
  aggregate?: Maybe<Private_User_Data_Aggregate_Fields>;
  nodes: Array<Private_User_Data>;
};

/** aggregate fields of "private_user_data" */
export type Private_User_Data_Aggregate_Fields = {
  __typename?: 'private_user_data_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Private_User_Data_Max_Fields>;
  min?: Maybe<Private_User_Data_Min_Fields>;
};


/** aggregate fields of "private_user_data" */
export type Private_User_Data_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Private_User_Data_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "private_user_data" */
export type Private_User_Data_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Private_User_Data_Max_Order_By>;
  min?: Maybe<Private_User_Data_Min_Order_By>;
};

/** input type for inserting array relation for remote table "private_user_data" */
export type Private_User_Data_Arr_Rel_Insert_Input = {
  data: Array<Private_User_Data_Insert_Input>;
};

/** Boolean expression to filter rows from the table "private_user_data". All fields are combined with a logical 'AND'. */
export type Private_User_Data_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Private_User_Data_Bool_Exp>>>;
  _not?: Maybe<Private_User_Data_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Private_User_Data_Bool_Exp>>>;
  email?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
};

/** input type for inserting data into table "private_user_data" */
export type Private_User_Data_Insert_Input = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Private_User_Data_Max_Fields = {
  __typename?: 'private_user_data_max_fields';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "private_user_data" */
export type Private_User_Data_Max_Order_By = {
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Private_User_Data_Min_Fields = {
  __typename?: 'private_user_data_min_fields';
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "private_user_data" */
export type Private_User_Data_Min_Order_By = {
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** response of any mutation on the table "private_user_data" */
export type Private_User_Data_Mutation_Response = {
  __typename?: 'private_user_data_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Private_User_Data>;
};

/** input type for inserting object relation for remote table "private_user_data" */
export type Private_User_Data_Obj_Rel_Insert_Input = {
  data: Private_User_Data_Insert_Input;
};

/** ordering options when selecting data from "private_user_data" */
export type Private_User_Data_Order_By = {
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

/** select columns of table "private_user_data" */
export enum Private_User_Data_Select_Column {
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id'
}

/** input type for updating data in table "private_user_data" */
export type Private_User_Data_Set_Input = {
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

/** query root */
export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "chat_messages" */
  chat_messages: Array<Chat_Messages>;
  /** fetch aggregated fields from the table: "chat_messages" */
  chat_messages_aggregate: Chat_Messages_Aggregate;
  /** fetch data from the table: "chat_messages" using primary key columns */
  chat_messages_by_pk?: Maybe<Chat_Messages>;
  /** fetch data from the table: "current_user" */
  current_user: Array<Current_User>;
  /** fetch aggregated fields from the table: "current_user" */
  current_user_aggregate: Current_User_Aggregate;
  /** fetch data from the table: "private_user_data" */
  private_user_data: Array<Private_User_Data>;
  /** fetch aggregated fields from the table: "private_user_data" */
  private_user_data_aggregate: Private_User_Data_Aggregate;
  /** fetch data from the table: "shopping_list_active_users" */
  shopping_list_active_users: Array<Shopping_List_Active_Users>;
  /** fetch aggregated fields from the table: "shopping_list_active_users" */
  shopping_list_active_users_aggregate: Shopping_List_Active_Users_Aggregate;
  /** fetch data from the table: "shopping_list_active_users" using primary key columns */
  shopping_list_active_users_by_pk?: Maybe<Shopping_List_Active_Users>;
  /** fetch data from the table: "shopping_list_items" */
  shopping_list_items: Array<Shopping_List_Items>;
  /** fetch aggregated fields from the table: "shopping_list_items" */
  shopping_list_items_aggregate: Shopping_List_Items_Aggregate;
  /** fetch data from the table: "shopping_list_items" using primary key columns */
  shopping_list_items_by_pk?: Maybe<Shopping_List_Items>;
  /** fetch data from the table: "shopping_lists" */
  shopping_lists: Array<Shopping_Lists>;
  /** fetch aggregated fields from the table: "shopping_lists" */
  shopping_lists_aggregate: Shopping_Lists_Aggregate;
  /** fetch data from the table: "shopping_lists" using primary key columns */
  shopping_lists_by_pk?: Maybe<Shopping_Lists>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


/** query root */
export type Query_RootChat_MessagesArgs = {
  distinct_on?: Maybe<Array<Chat_Messages_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Messages_Order_By>>;
  where?: Maybe<Chat_Messages_Bool_Exp>;
};


/** query root */
export type Query_RootChat_Messages_AggregateArgs = {
  distinct_on?: Maybe<Array<Chat_Messages_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Messages_Order_By>>;
  where?: Maybe<Chat_Messages_Bool_Exp>;
};


/** query root */
export type Query_RootChat_Messages_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootCurrent_UserArgs = {
  distinct_on?: Maybe<Array<Current_User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Current_User_Order_By>>;
  where?: Maybe<Current_User_Bool_Exp>;
};


/** query root */
export type Query_RootCurrent_User_AggregateArgs = {
  distinct_on?: Maybe<Array<Current_User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Current_User_Order_By>>;
  where?: Maybe<Current_User_Bool_Exp>;
};


/** query root */
export type Query_RootPrivate_User_DataArgs = {
  distinct_on?: Maybe<Array<Private_User_Data_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Private_User_Data_Order_By>>;
  where?: Maybe<Private_User_Data_Bool_Exp>;
};


/** query root */
export type Query_RootPrivate_User_Data_AggregateArgs = {
  distinct_on?: Maybe<Array<Private_User_Data_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Private_User_Data_Order_By>>;
  where?: Maybe<Private_User_Data_Bool_Exp>;
};


/** query root */
export type Query_RootShopping_List_Active_UsersArgs = {
  distinct_on?: Maybe<Array<Shopping_List_Active_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Shopping_List_Active_Users_Order_By>>;
  where?: Maybe<Shopping_List_Active_Users_Bool_Exp>;
};


/** query root */
export type Query_RootShopping_List_Active_Users_AggregateArgs = {
  distinct_on?: Maybe<Array<Shopping_List_Active_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Shopping_List_Active_Users_Order_By>>;
  where?: Maybe<Shopping_List_Active_Users_Bool_Exp>;
};


/** query root */
export type Query_RootShopping_List_Active_Users_By_PkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type Query_RootShopping_List_ItemsArgs = {
  distinct_on?: Maybe<Array<Shopping_List_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Shopping_List_Items_Order_By>>;
  where?: Maybe<Shopping_List_Items_Bool_Exp>;
};


/** query root */
export type Query_RootShopping_List_Items_AggregateArgs = {
  distinct_on?: Maybe<Array<Shopping_List_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Shopping_List_Items_Order_By>>;
  where?: Maybe<Shopping_List_Items_Bool_Exp>;
};


/** query root */
export type Query_RootShopping_List_Items_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootShopping_ListsArgs = {
  distinct_on?: Maybe<Array<Shopping_Lists_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Shopping_Lists_Order_By>>;
  where?: Maybe<Shopping_Lists_Bool_Exp>;
};


/** query root */
export type Query_RootShopping_Lists_AggregateArgs = {
  distinct_on?: Maybe<Array<Shopping_Lists_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Shopping_Lists_Order_By>>;
  where?: Maybe<Shopping_Lists_Bool_Exp>;
};


/** query root */
export type Query_RootShopping_Lists_By_PkArgs = {
  id: Scalars['uuid'];
};


/** query root */
export type Query_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_By_PkArgs = {
  id: Scalars['String'];
};

/** columns and relationships of "shopping_list_active_users" */
export type Shopping_List_Active_Users = {
  __typename?: 'shopping_list_active_users';
  created_at: Scalars['timestamptz'];
  id: Scalars['Int'];
  /** When user joins the room. */
  last_joined_at: Scalars['timestamptz'];
  /** An object relationship */
  shopping_list: Shopping_Lists;
  shopping_list_id: Scalars['uuid'];
  /** When user does an action. */
  updated_at: Scalars['timestamptz'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['String'];
};

/** aggregated selection of "shopping_list_active_users" */
export type Shopping_List_Active_Users_Aggregate = {
  __typename?: 'shopping_list_active_users_aggregate';
  aggregate?: Maybe<Shopping_List_Active_Users_Aggregate_Fields>;
  nodes: Array<Shopping_List_Active_Users>;
};

/** aggregate fields of "shopping_list_active_users" */
export type Shopping_List_Active_Users_Aggregate_Fields = {
  __typename?: 'shopping_list_active_users_aggregate_fields';
  avg?: Maybe<Shopping_List_Active_Users_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Shopping_List_Active_Users_Max_Fields>;
  min?: Maybe<Shopping_List_Active_Users_Min_Fields>;
  stddev?: Maybe<Shopping_List_Active_Users_Stddev_Fields>;
  stddev_pop?: Maybe<Shopping_List_Active_Users_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Shopping_List_Active_Users_Stddev_Samp_Fields>;
  sum?: Maybe<Shopping_List_Active_Users_Sum_Fields>;
  var_pop?: Maybe<Shopping_List_Active_Users_Var_Pop_Fields>;
  var_samp?: Maybe<Shopping_List_Active_Users_Var_Samp_Fields>;
  variance?: Maybe<Shopping_List_Active_Users_Variance_Fields>;
};


/** aggregate fields of "shopping_list_active_users" */
export type Shopping_List_Active_Users_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Shopping_List_Active_Users_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "shopping_list_active_users" */
export type Shopping_List_Active_Users_Aggregate_Order_By = {
  avg?: Maybe<Shopping_List_Active_Users_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Shopping_List_Active_Users_Max_Order_By>;
  min?: Maybe<Shopping_List_Active_Users_Min_Order_By>;
  stddev?: Maybe<Shopping_List_Active_Users_Stddev_Order_By>;
  stddev_pop?: Maybe<Shopping_List_Active_Users_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Shopping_List_Active_Users_Stddev_Samp_Order_By>;
  sum?: Maybe<Shopping_List_Active_Users_Sum_Order_By>;
  var_pop?: Maybe<Shopping_List_Active_Users_Var_Pop_Order_By>;
  var_samp?: Maybe<Shopping_List_Active_Users_Var_Samp_Order_By>;
  variance?: Maybe<Shopping_List_Active_Users_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "shopping_list_active_users" */
export type Shopping_List_Active_Users_Arr_Rel_Insert_Input = {
  data: Array<Shopping_List_Active_Users_Insert_Input>;
  on_conflict?: Maybe<Shopping_List_Active_Users_On_Conflict>;
};

/** aggregate avg on columns */
export type Shopping_List_Active_Users_Avg_Fields = {
  __typename?: 'shopping_list_active_users_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "shopping_list_active_users" */
export type Shopping_List_Active_Users_Avg_Order_By = {
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "shopping_list_active_users". All fields are combined with a logical 'AND'. */
export type Shopping_List_Active_Users_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Shopping_List_Active_Users_Bool_Exp>>>;
  _not?: Maybe<Shopping_List_Active_Users_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Shopping_List_Active_Users_Bool_Exp>>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Int_Comparison_Exp>;
  last_joined_at?: Maybe<Timestamptz_Comparison_Exp>;
  shopping_list?: Maybe<Shopping_Lists_Bool_Exp>;
  shopping_list_id?: Maybe<Uuid_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "shopping_list_active_users" */
export enum Shopping_List_Active_Users_Constraint {
  /** unique or primary key constraint */
  ShoppingListActiveUsersPkey = 'shopping_list_active_users_pkey',
  /** unique or primary key constraint */
  ShoppingListActiveUsersUserIdShoppingListIdKey = 'shopping_list_active_users_user_id_shopping_list_id_key'
}

/** input type for incrementing integer column in table "shopping_list_active_users" */
export type Shopping_List_Active_Users_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "shopping_list_active_users" */
export type Shopping_List_Active_Users_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  last_joined_at?: Maybe<Scalars['timestamptz']>;
  shopping_list?: Maybe<Shopping_Lists_Obj_Rel_Insert_Input>;
  shopping_list_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Shopping_List_Active_Users_Max_Fields = {
  __typename?: 'shopping_list_active_users_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  last_joined_at?: Maybe<Scalars['timestamptz']>;
  shopping_list_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "shopping_list_active_users" */
export type Shopping_List_Active_Users_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  last_joined_at?: Maybe<Order_By>;
  shopping_list_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Shopping_List_Active_Users_Min_Fields = {
  __typename?: 'shopping_list_active_users_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  last_joined_at?: Maybe<Scalars['timestamptz']>;
  shopping_list_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "shopping_list_active_users" */
export type Shopping_List_Active_Users_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  last_joined_at?: Maybe<Order_By>;
  shopping_list_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "shopping_list_active_users" */
export type Shopping_List_Active_Users_Mutation_Response = {
  __typename?: 'shopping_list_active_users_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Shopping_List_Active_Users>;
};

/** input type for inserting object relation for remote table "shopping_list_active_users" */
export type Shopping_List_Active_Users_Obj_Rel_Insert_Input = {
  data: Shopping_List_Active_Users_Insert_Input;
  on_conflict?: Maybe<Shopping_List_Active_Users_On_Conflict>;
};

/** on conflict condition type for table "shopping_list_active_users" */
export type Shopping_List_Active_Users_On_Conflict = {
  constraint: Shopping_List_Active_Users_Constraint;
  update_columns: Array<Shopping_List_Active_Users_Update_Column>;
  where?: Maybe<Shopping_List_Active_Users_Bool_Exp>;
};

/** ordering options when selecting data from "shopping_list_active_users" */
export type Shopping_List_Active_Users_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  last_joined_at?: Maybe<Order_By>;
  shopping_list?: Maybe<Shopping_Lists_Order_By>;
  shopping_list_id?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "shopping_list_active_users" */
export type Shopping_List_Active_Users_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "shopping_list_active_users" */
export enum Shopping_List_Active_Users_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastJoinedAt = 'last_joined_at',
  /** column name */
  ShoppingListId = 'shopping_list_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "shopping_list_active_users" */
export type Shopping_List_Active_Users_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['Int']>;
  last_joined_at?: Maybe<Scalars['timestamptz']>;
  shopping_list_id?: Maybe<Scalars['uuid']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Shopping_List_Active_Users_Stddev_Fields = {
  __typename?: 'shopping_list_active_users_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "shopping_list_active_users" */
export type Shopping_List_Active_Users_Stddev_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Shopping_List_Active_Users_Stddev_Pop_Fields = {
  __typename?: 'shopping_list_active_users_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "shopping_list_active_users" */
export type Shopping_List_Active_Users_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Shopping_List_Active_Users_Stddev_Samp_Fields = {
  __typename?: 'shopping_list_active_users_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "shopping_list_active_users" */
export type Shopping_List_Active_Users_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Shopping_List_Active_Users_Sum_Fields = {
  __typename?: 'shopping_list_active_users_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "shopping_list_active_users" */
export type Shopping_List_Active_Users_Sum_Order_By = {
  id?: Maybe<Order_By>;
};

/** update columns of table "shopping_list_active_users" */
export enum Shopping_List_Active_Users_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastJoinedAt = 'last_joined_at',
  /** column name */
  ShoppingListId = 'shopping_list_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** aggregate var_pop on columns */
export type Shopping_List_Active_Users_Var_Pop_Fields = {
  __typename?: 'shopping_list_active_users_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "shopping_list_active_users" */
export type Shopping_List_Active_Users_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Shopping_List_Active_Users_Var_Samp_Fields = {
  __typename?: 'shopping_list_active_users_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "shopping_list_active_users" */
export type Shopping_List_Active_Users_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Shopping_List_Active_Users_Variance_Fields = {
  __typename?: 'shopping_list_active_users_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "shopping_list_active_users" */
export type Shopping_List_Active_Users_Variance_Order_By = {
  id?: Maybe<Order_By>;
};

/** columns and relationships of "shopping_list_items" */
export type Shopping_List_Items = {
  __typename?: 'shopping_list_items';
  /** An array relationship */
  chat_messages: Array<Chat_Messages>;
  /** An aggregated array relationship */
  chat_messages_aggregate: Chat_Messages_Aggregate;
  created_at: Scalars['timestamptz'];
  created_by: Scalars['String'];
  /** An object relationship */
  creator: Users;
  id: Scalars['uuid'];
  is_completed: Scalars['Boolean'];
  /** An object relationship */
  shopping_list: Shopping_Lists;
  shopping_list_id: Scalars['uuid'];
  title: Scalars['String'];
  updated_at: Scalars['timestamptz'];
  updated_by: Scalars['String'];
  /** An object relationship */
  updator: Users;
};


/** columns and relationships of "shopping_list_items" */
export type Shopping_List_ItemsChat_MessagesArgs = {
  distinct_on?: Maybe<Array<Chat_Messages_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Messages_Order_By>>;
  where?: Maybe<Chat_Messages_Bool_Exp>;
};


/** columns and relationships of "shopping_list_items" */
export type Shopping_List_ItemsChat_Messages_AggregateArgs = {
  distinct_on?: Maybe<Array<Chat_Messages_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Messages_Order_By>>;
  where?: Maybe<Chat_Messages_Bool_Exp>;
};

/** aggregated selection of "shopping_list_items" */
export type Shopping_List_Items_Aggregate = {
  __typename?: 'shopping_list_items_aggregate';
  aggregate?: Maybe<Shopping_List_Items_Aggregate_Fields>;
  nodes: Array<Shopping_List_Items>;
};

/** aggregate fields of "shopping_list_items" */
export type Shopping_List_Items_Aggregate_Fields = {
  __typename?: 'shopping_list_items_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Shopping_List_Items_Max_Fields>;
  min?: Maybe<Shopping_List_Items_Min_Fields>;
};


/** aggregate fields of "shopping_list_items" */
export type Shopping_List_Items_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Shopping_List_Items_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "shopping_list_items" */
export type Shopping_List_Items_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Shopping_List_Items_Max_Order_By>;
  min?: Maybe<Shopping_List_Items_Min_Order_By>;
};

/** input type for inserting array relation for remote table "shopping_list_items" */
export type Shopping_List_Items_Arr_Rel_Insert_Input = {
  data: Array<Shopping_List_Items_Insert_Input>;
  on_conflict?: Maybe<Shopping_List_Items_On_Conflict>;
};

/** Boolean expression to filter rows from the table "shopping_list_items". All fields are combined with a logical 'AND'. */
export type Shopping_List_Items_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Shopping_List_Items_Bool_Exp>>>;
  _not?: Maybe<Shopping_List_Items_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Shopping_List_Items_Bool_Exp>>>;
  chat_messages?: Maybe<Chat_Messages_Bool_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  created_by?: Maybe<String_Comparison_Exp>;
  creator?: Maybe<Users_Bool_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  is_completed?: Maybe<Boolean_Comparison_Exp>;
  shopping_list?: Maybe<Shopping_Lists_Bool_Exp>;
  shopping_list_id?: Maybe<Uuid_Comparison_Exp>;
  title?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
  updated_by?: Maybe<String_Comparison_Exp>;
  updator?: Maybe<Users_Bool_Exp>;
};

/** unique or primary key constraints on table "shopping_list_items" */
export enum Shopping_List_Items_Constraint {
  /** unique or primary key constraint */
  ListItemsPkey = 'list_items_pkey'
}

/** input type for inserting data into table "shopping_list_items" */
export type Shopping_List_Items_Insert_Input = {
  chat_messages?: Maybe<Chat_Messages_Arr_Rel_Insert_Input>;
  created_at?: Maybe<Scalars['timestamptz']>;
  created_by?: Maybe<Scalars['String']>;
  creator?: Maybe<Users_Obj_Rel_Insert_Input>;
  id?: Maybe<Scalars['uuid']>;
  is_completed?: Maybe<Scalars['Boolean']>;
  shopping_list?: Maybe<Shopping_Lists_Obj_Rel_Insert_Input>;
  shopping_list_id?: Maybe<Scalars['uuid']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  updated_by?: Maybe<Scalars['String']>;
  updator?: Maybe<Users_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Shopping_List_Items_Max_Fields = {
  __typename?: 'shopping_list_items_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  created_by?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  shopping_list_id?: Maybe<Scalars['uuid']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  updated_by?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "shopping_list_items" */
export type Shopping_List_Items_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  created_by?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  shopping_list_id?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  updated_by?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Shopping_List_Items_Min_Fields = {
  __typename?: 'shopping_list_items_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  created_by?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  shopping_list_id?: Maybe<Scalars['uuid']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  updated_by?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "shopping_list_items" */
export type Shopping_List_Items_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  created_by?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  shopping_list_id?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  updated_by?: Maybe<Order_By>;
};

/** response of any mutation on the table "shopping_list_items" */
export type Shopping_List_Items_Mutation_Response = {
  __typename?: 'shopping_list_items_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Shopping_List_Items>;
};

/** input type for inserting object relation for remote table "shopping_list_items" */
export type Shopping_List_Items_Obj_Rel_Insert_Input = {
  data: Shopping_List_Items_Insert_Input;
  on_conflict?: Maybe<Shopping_List_Items_On_Conflict>;
};

/** on conflict condition type for table "shopping_list_items" */
export type Shopping_List_Items_On_Conflict = {
  constraint: Shopping_List_Items_Constraint;
  update_columns: Array<Shopping_List_Items_Update_Column>;
  where?: Maybe<Shopping_List_Items_Bool_Exp>;
};

/** ordering options when selecting data from "shopping_list_items" */
export type Shopping_List_Items_Order_By = {
  chat_messages_aggregate?: Maybe<Chat_Messages_Aggregate_Order_By>;
  created_at?: Maybe<Order_By>;
  created_by?: Maybe<Order_By>;
  creator?: Maybe<Users_Order_By>;
  id?: Maybe<Order_By>;
  is_completed?: Maybe<Order_By>;
  shopping_list?: Maybe<Shopping_Lists_Order_By>;
  shopping_list_id?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
  updated_by?: Maybe<Order_By>;
  updator?: Maybe<Users_Order_By>;
};

/** primary key columns input for table: "shopping_list_items" */
export type Shopping_List_Items_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "shopping_list_items" */
export enum Shopping_List_Items_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedBy = 'created_by',
  /** column name */
  Id = 'id',
  /** column name */
  IsCompleted = 'is_completed',
  /** column name */
  ShoppingListId = 'shopping_list_id',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UpdatedBy = 'updated_by'
}

/** input type for updating data in table "shopping_list_items" */
export type Shopping_List_Items_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  created_by?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  is_completed?: Maybe<Scalars['Boolean']>;
  shopping_list_id?: Maybe<Scalars['uuid']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
  updated_by?: Maybe<Scalars['String']>;
};

/** update columns of table "shopping_list_items" */
export enum Shopping_List_Items_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedBy = 'created_by',
  /** column name */
  Id = 'id',
  /** column name */
  IsCompleted = 'is_completed',
  /** column name */
  ShoppingListId = 'shopping_list_id',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UpdatedBy = 'updated_by'
}

/** columns and relationships of "shopping_lists" */
export type Shopping_Lists = {
  __typename?: 'shopping_lists';
  /** An array relationship */
  active_users: Array<Shopping_List_Active_Users>;
  /** An aggregated array relationship */
  active_users_aggregate: Shopping_List_Active_Users_Aggregate;
  created_at: Scalars['timestamptz'];
  created_by: Scalars['String'];
  /** An object relationship */
  creator: Users;
  id: Scalars['uuid'];
  /** An array relationship */
  shopping_list_items: Array<Shopping_List_Items>;
  /** An aggregated array relationship */
  shopping_list_items_aggregate: Shopping_List_Items_Aggregate;
  title: Scalars['String'];
  updated_at: Scalars['timestamptz'];
};


/** columns and relationships of "shopping_lists" */
export type Shopping_ListsActive_UsersArgs = {
  distinct_on?: Maybe<Array<Shopping_List_Active_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Shopping_List_Active_Users_Order_By>>;
  where?: Maybe<Shopping_List_Active_Users_Bool_Exp>;
};


/** columns and relationships of "shopping_lists" */
export type Shopping_ListsActive_Users_AggregateArgs = {
  distinct_on?: Maybe<Array<Shopping_List_Active_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Shopping_List_Active_Users_Order_By>>;
  where?: Maybe<Shopping_List_Active_Users_Bool_Exp>;
};


/** columns and relationships of "shopping_lists" */
export type Shopping_ListsShopping_List_ItemsArgs = {
  distinct_on?: Maybe<Array<Shopping_List_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Shopping_List_Items_Order_By>>;
  where?: Maybe<Shopping_List_Items_Bool_Exp>;
};


/** columns and relationships of "shopping_lists" */
export type Shopping_ListsShopping_List_Items_AggregateArgs = {
  distinct_on?: Maybe<Array<Shopping_List_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Shopping_List_Items_Order_By>>;
  where?: Maybe<Shopping_List_Items_Bool_Exp>;
};

/** aggregated selection of "shopping_lists" */
export type Shopping_Lists_Aggregate = {
  __typename?: 'shopping_lists_aggregate';
  aggregate?: Maybe<Shopping_Lists_Aggregate_Fields>;
  nodes: Array<Shopping_Lists>;
};

/** aggregate fields of "shopping_lists" */
export type Shopping_Lists_Aggregate_Fields = {
  __typename?: 'shopping_lists_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Shopping_Lists_Max_Fields>;
  min?: Maybe<Shopping_Lists_Min_Fields>;
};


/** aggregate fields of "shopping_lists" */
export type Shopping_Lists_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Shopping_Lists_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "shopping_lists" */
export type Shopping_Lists_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Shopping_Lists_Max_Order_By>;
  min?: Maybe<Shopping_Lists_Min_Order_By>;
};

/** input type for inserting array relation for remote table "shopping_lists" */
export type Shopping_Lists_Arr_Rel_Insert_Input = {
  data: Array<Shopping_Lists_Insert_Input>;
  on_conflict?: Maybe<Shopping_Lists_On_Conflict>;
};

/** Boolean expression to filter rows from the table "shopping_lists". All fields are combined with a logical 'AND'. */
export type Shopping_Lists_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Shopping_Lists_Bool_Exp>>>;
  _not?: Maybe<Shopping_Lists_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Shopping_Lists_Bool_Exp>>>;
  active_users?: Maybe<Shopping_List_Active_Users_Bool_Exp>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  created_by?: Maybe<String_Comparison_Exp>;
  creator?: Maybe<Users_Bool_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  shopping_list_items?: Maybe<Shopping_List_Items_Bool_Exp>;
  title?: Maybe<String_Comparison_Exp>;
  updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "shopping_lists" */
export enum Shopping_Lists_Constraint {
  /** unique or primary key constraint */
  ShoppingListsPkey = 'shopping_lists_pkey'
}

/** input type for inserting data into table "shopping_lists" */
export type Shopping_Lists_Insert_Input = {
  active_users?: Maybe<Shopping_List_Active_Users_Arr_Rel_Insert_Input>;
  created_at?: Maybe<Scalars['timestamptz']>;
  created_by?: Maybe<Scalars['String']>;
  creator?: Maybe<Users_Obj_Rel_Insert_Input>;
  id?: Maybe<Scalars['uuid']>;
  shopping_list_items?: Maybe<Shopping_List_Items_Arr_Rel_Insert_Input>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Shopping_Lists_Max_Fields = {
  __typename?: 'shopping_lists_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  created_by?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "shopping_lists" */
export type Shopping_Lists_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  created_by?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Shopping_Lists_Min_Fields = {
  __typename?: 'shopping_lists_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  created_by?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "shopping_lists" */
export type Shopping_Lists_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  created_by?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** response of any mutation on the table "shopping_lists" */
export type Shopping_Lists_Mutation_Response = {
  __typename?: 'shopping_lists_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Shopping_Lists>;
};

/** input type for inserting object relation for remote table "shopping_lists" */
export type Shopping_Lists_Obj_Rel_Insert_Input = {
  data: Shopping_Lists_Insert_Input;
  on_conflict?: Maybe<Shopping_Lists_On_Conflict>;
};

/** on conflict condition type for table "shopping_lists" */
export type Shopping_Lists_On_Conflict = {
  constraint: Shopping_Lists_Constraint;
  update_columns: Array<Shopping_Lists_Update_Column>;
  where?: Maybe<Shopping_Lists_Bool_Exp>;
};

/** ordering options when selecting data from "shopping_lists" */
export type Shopping_Lists_Order_By = {
  active_users_aggregate?: Maybe<Shopping_List_Active_Users_Aggregate_Order_By>;
  created_at?: Maybe<Order_By>;
  created_by?: Maybe<Order_By>;
  creator?: Maybe<Users_Order_By>;
  id?: Maybe<Order_By>;
  shopping_list_items_aggregate?: Maybe<Shopping_List_Items_Aggregate_Order_By>;
  title?: Maybe<Order_By>;
  updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: "shopping_lists" */
export type Shopping_Lists_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "shopping_lists" */
export enum Shopping_Lists_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedBy = 'created_by',
  /** column name */
  Id = 'id',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "shopping_lists" */
export type Shopping_Lists_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  created_by?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  title?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** update columns of table "shopping_lists" */
export enum Shopping_Lists_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CreatedBy = 'created_by',
  /** column name */
  Id = 'id',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** subscription root */
export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "chat_messages" */
  chat_messages: Array<Chat_Messages>;
  /** fetch aggregated fields from the table: "chat_messages" */
  chat_messages_aggregate: Chat_Messages_Aggregate;
  /** fetch data from the table: "chat_messages" using primary key columns */
  chat_messages_by_pk?: Maybe<Chat_Messages>;
  /** fetch data from the table: "current_user" */
  current_user: Array<Current_User>;
  /** fetch aggregated fields from the table: "current_user" */
  current_user_aggregate: Current_User_Aggregate;
  /** fetch data from the table: "private_user_data" */
  private_user_data: Array<Private_User_Data>;
  /** fetch aggregated fields from the table: "private_user_data" */
  private_user_data_aggregate: Private_User_Data_Aggregate;
  /** fetch data from the table: "shopping_list_active_users" */
  shopping_list_active_users: Array<Shopping_List_Active_Users>;
  /** fetch aggregated fields from the table: "shopping_list_active_users" */
  shopping_list_active_users_aggregate: Shopping_List_Active_Users_Aggregate;
  /** fetch data from the table: "shopping_list_active_users" using primary key columns */
  shopping_list_active_users_by_pk?: Maybe<Shopping_List_Active_Users>;
  /** fetch data from the table: "shopping_list_items" */
  shopping_list_items: Array<Shopping_List_Items>;
  /** fetch aggregated fields from the table: "shopping_list_items" */
  shopping_list_items_aggregate: Shopping_List_Items_Aggregate;
  /** fetch data from the table: "shopping_list_items" using primary key columns */
  shopping_list_items_by_pk?: Maybe<Shopping_List_Items>;
  /** fetch data from the table: "shopping_lists" */
  shopping_lists: Array<Shopping_Lists>;
  /** fetch aggregated fields from the table: "shopping_lists" */
  shopping_lists_aggregate: Shopping_Lists_Aggregate;
  /** fetch data from the table: "shopping_lists" using primary key columns */
  shopping_lists_by_pk?: Maybe<Shopping_Lists>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


/** subscription root */
export type Subscription_RootChat_MessagesArgs = {
  distinct_on?: Maybe<Array<Chat_Messages_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Messages_Order_By>>;
  where?: Maybe<Chat_Messages_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootChat_Messages_AggregateArgs = {
  distinct_on?: Maybe<Array<Chat_Messages_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Chat_Messages_Order_By>>;
  where?: Maybe<Chat_Messages_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootChat_Messages_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootCurrent_UserArgs = {
  distinct_on?: Maybe<Array<Current_User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Current_User_Order_By>>;
  where?: Maybe<Current_User_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootCurrent_User_AggregateArgs = {
  distinct_on?: Maybe<Array<Current_User_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Current_User_Order_By>>;
  where?: Maybe<Current_User_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPrivate_User_DataArgs = {
  distinct_on?: Maybe<Array<Private_User_Data_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Private_User_Data_Order_By>>;
  where?: Maybe<Private_User_Data_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPrivate_User_Data_AggregateArgs = {
  distinct_on?: Maybe<Array<Private_User_Data_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Private_User_Data_Order_By>>;
  where?: Maybe<Private_User_Data_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootShopping_List_Active_UsersArgs = {
  distinct_on?: Maybe<Array<Shopping_List_Active_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Shopping_List_Active_Users_Order_By>>;
  where?: Maybe<Shopping_List_Active_Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootShopping_List_Active_Users_AggregateArgs = {
  distinct_on?: Maybe<Array<Shopping_List_Active_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Shopping_List_Active_Users_Order_By>>;
  where?: Maybe<Shopping_List_Active_Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootShopping_List_Active_Users_By_PkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootShopping_List_ItemsArgs = {
  distinct_on?: Maybe<Array<Shopping_List_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Shopping_List_Items_Order_By>>;
  where?: Maybe<Shopping_List_Items_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootShopping_List_Items_AggregateArgs = {
  distinct_on?: Maybe<Array<Shopping_List_Items_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Shopping_List_Items_Order_By>>;
  where?: Maybe<Shopping_List_Items_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootShopping_List_Items_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootShopping_ListsArgs = {
  distinct_on?: Maybe<Array<Shopping_Lists_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Shopping_Lists_Order_By>>;
  where?: Maybe<Shopping_Lists_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootShopping_Lists_AggregateArgs = {
  distinct_on?: Maybe<Array<Shopping_Lists_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Shopping_Lists_Order_By>>;
  where?: Maybe<Shopping_Lists_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootShopping_Lists_By_PkArgs = {
  id: Scalars['uuid'];
};


/** subscription root */
export type Subscription_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['String'];
};


/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  created_at: Scalars['timestamptz'];
  /** An array relationship */
  created_shopping_lists: Array<Shopping_Lists>;
  /** An aggregated array relationship */
  created_shopping_lists_aggregate: Shopping_Lists_Aggregate;
  email?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  /** An array relationship */
  joined_shopping_lists: Array<Shopping_List_Active_Users>;
  /** An aggregated array relationship */
  joined_shopping_lists_aggregate: Shopping_List_Active_Users_Aggregate;
  name: Scalars['String'];
  /** An object relationship */
  private_user_data?: Maybe<Private_User_Data>;
  /** A public id. This is mainly for caching of data. We could also use it for invite codes. */
  public_id: Scalars['uuid'];
};


/** columns and relationships of "users" */
export type UsersCreated_Shopping_ListsArgs = {
  distinct_on?: Maybe<Array<Shopping_Lists_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Shopping_Lists_Order_By>>;
  where?: Maybe<Shopping_Lists_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersCreated_Shopping_Lists_AggregateArgs = {
  distinct_on?: Maybe<Array<Shopping_Lists_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Shopping_Lists_Order_By>>;
  where?: Maybe<Shopping_Lists_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersJoined_Shopping_ListsArgs = {
  distinct_on?: Maybe<Array<Shopping_List_Active_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Shopping_List_Active_Users_Order_By>>;
  where?: Maybe<Shopping_List_Active_Users_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersJoined_Shopping_Lists_AggregateArgs = {
  distinct_on?: Maybe<Array<Shopping_List_Active_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Shopping_List_Active_Users_Order_By>>;
  where?: Maybe<Shopping_List_Active_Users_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Users_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "users" */
export type Users_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Users_Max_Order_By>;
  min?: Maybe<Users_Min_Order_By>;
};

/** input type for inserting array relation for remote table "users" */
export type Users_Arr_Rel_Insert_Input = {
  data: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  _not?: Maybe<Users_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  created_shopping_lists?: Maybe<Shopping_Lists_Bool_Exp>;
  email?: Maybe<String_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  joined_shopping_lists?: Maybe<Shopping_List_Active_Users_Bool_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  private_user_data?: Maybe<Private_User_Data_Bool_Exp>;
  public_id?: Maybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersIdKey = 'users__id_key',
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey'
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  created_shopping_lists?: Maybe<Shopping_Lists_Arr_Rel_Insert_Input>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  joined_shopping_lists?: Maybe<Shopping_List_Active_Users_Arr_Rel_Insert_Input>;
  name?: Maybe<Scalars['String']>;
  private_user_data?: Maybe<Private_User_Data_Obj_Rel_Insert_Input>;
  public_id?: Maybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  public_id?: Maybe<Scalars['uuid']>;
};

/** order by max() on columns of table "users" */
export type Users_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  public_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  public_id?: Maybe<Scalars['uuid']>;
};

/** order by min() on columns of table "users" */
export type Users_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  public_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns: Array<Users_Update_Column>;
  where?: Maybe<Users_Bool_Exp>;
};

/** ordering options when selecting data from "users" */
export type Users_Order_By = {
  created_at?: Maybe<Order_By>;
  created_shopping_lists_aggregate?: Maybe<Shopping_Lists_Aggregate_Order_By>;
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  joined_shopping_lists_aggregate?: Maybe<Shopping_List_Active_Users_Aggregate_Order_By>;
  name?: Maybe<Order_By>;
  private_user_data?: Maybe<Private_User_Data_Order_By>;
  public_id?: Maybe<Order_By>;
};

/** primary key columns input for table: "users" */
export type Users_Pk_Columns_Input = {
  id: Scalars['String'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  PublicId = 'public_id'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  public_id?: Maybe<Scalars['uuid']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  PublicId = 'public_id'
}


/** expression to compare columns of type uuid. All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars['uuid']>;
  _gt?: Maybe<Scalars['uuid']>;
  _gte?: Maybe<Scalars['uuid']>;
  _in?: Maybe<Array<Scalars['uuid']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['uuid']>;
  _lte?: Maybe<Scalars['uuid']>;
  _neq?: Maybe<Scalars['uuid']>;
  _nin?: Maybe<Array<Scalars['uuid']>>;
};

export type ActiveUserDataFragment = (
  { __typename?: 'shopping_list_active_users' }
  & { user: (
    { __typename?: 'users' }
    & Pick<Users, 'name' | 'public_id'>
  ) }
);

export type CurrentUserDataFragment = (
  { __typename?: 'users' }
  & Pick<Users, 'name' | 'public_id'>
);

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = (
  { __typename?: 'query_root' }
  & { current_user: Array<(
    { __typename?: 'current_user' }
    & Pick<Current_User, 'id'>
    & { user?: Maybe<(
      { __typename?: 'users' }
      & Pick<Users, 'name' | 'public_id'>
    )> }
  )> }
);

export type CreatedShoppingListsDataFragment = (
  { __typename?: 'shopping_lists' }
  & ShoppingListDataFragment
);

export type GetCreatedShoppingListsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCreatedShoppingListsQuery = (
  { __typename?: 'query_root' }
  & { current_user: Array<(
    { __typename?: 'current_user' }
    & Pick<Current_User, 'id'>
    & { user?: Maybe<(
      { __typename?: 'users' }
      & { created_shopping_lists: Array<(
        { __typename?: 'shopping_lists' }
        & CreatedShoppingListsDataFragment
      )> }
      & UserDataFragment
    )> }
  )> }
);

export type DeleteShoppingListMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type DeleteShoppingListMutation = (
  { __typename?: 'mutation_root' }
  & { delete_shopping_lists_by_pk?: Maybe<(
    { __typename?: 'shopping_lists' }
    & Pick<Shopping_Lists, 'id'>
  )> }
);

export type UpdateShoppingListMutationVariables = Exact<{
  id: Scalars['uuid'];
  set_input: Shopping_Lists_Set_Input;
}>;


export type UpdateShoppingListMutation = (
  { __typename?: 'mutation_root' }
  & { update_shopping_lists_by_pk?: Maybe<(
    { __typename?: 'shopping_lists' }
    & ShoppingListDataFragment
  )> }
);

export type CreateShoppingListMutationVariables = Exact<{
  title: Scalars['String'];
}>;


export type CreateShoppingListMutation = (
  { __typename?: 'mutation_root' }
  & { insert_shopping_lists_one?: Maybe<(
    { __typename?: 'shopping_lists' }
    & ShoppingListDataFragment
  )> }
);

export type JoinedShoppingListsDataFragment = (
  { __typename?: 'shopping_list_active_users' }
  & { shopping_list: (
    { __typename?: 'shopping_lists' }
    & ShoppingListDataFragment
  ) }
);

export type GetJoinedShoppingListsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetJoinedShoppingListsQuery = (
  { __typename?: 'query_root' }
  & { current_user: Array<(
    { __typename?: 'current_user' }
    & Pick<Current_User, 'id'>
    & { user?: Maybe<(
      { __typename?: 'users' }
      & Pick<Users, 'public_id'>
      & { joined_shopping_lists: Array<(
        { __typename?: 'shopping_list_active_users' }
        & JoinedShoppingListsDataFragment
      )> }
    )> }
  )> }
);

export type ShoppingListDataFragment = (
  { __typename?: 'shopping_lists' }
  & Pick<Shopping_Lists, 'id' | 'updated_at' | 'created_at' | 'title'>
  & { creator: (
    { __typename?: 'users' }
    & UserDataFragment
  ), active_users: Array<(
    { __typename?: 'shopping_list_active_users' }
    & ActiveUserDataFragment
  )> }
);

export type UserDataFragment = (
  { __typename?: 'users' }
  & Pick<Users, 'name' | 'public_id'>
);

export type ChatMessageDataFragment = (
  { __typename?: 'chat_messages' }
  & Pick<Chat_Messages, 'created_at' | 'id' | 'message'>
  & { creator: (
    { __typename?: 'users' }
    & UserDataFragment
  ) }
);

export type GetChatMessagesQueryVariables = Exact<{
  shopping_list_item_id: Scalars['uuid'];
}>;


export type GetChatMessagesQuery = (
  { __typename?: 'query_root' }
  & { shopping_list_items_by_pk?: Maybe<(
    { __typename?: 'shopping_list_items' }
    & Pick<Shopping_List_Items, 'id'>
    & { chat_messages: Array<(
      { __typename?: 'chat_messages' }
      & ChatMessageDataFragment
    )> }
  )> }
);

export type SubscribeChatMessagesSubscriptionVariables = Exact<{
  shopping_list_item_id: Scalars['uuid'];
}>;


export type SubscribeChatMessagesSubscription = (
  { __typename?: 'subscription_root' }
  & { shopping_list_items_by_pk?: Maybe<(
    { __typename?: 'shopping_list_items' }
    & Pick<Shopping_List_Items, 'id'>
    & { chat_messages: Array<(
      { __typename?: 'chat_messages' }
      & ChatMessageDataFragment
    )> }
  )> }
);

export type CreateChatMessageMutationVariables = Exact<{
  shopping_list_item_id: Scalars['uuid'];
  message: Scalars['String'];
}>;


export type CreateChatMessageMutation = (
  { __typename?: 'mutation_root' }
  & { insert_chat_messages_one?: Maybe<(
    { __typename?: 'chat_messages' }
    & ChatMessageDataFragment
  )> }
);

export type ShoppingListItemDataFragment = (
  { __typename?: 'shopping_list_items' }
  & Pick<Shopping_List_Items, 'id' | 'created_at' | 'is_completed' | 'title' | 'updated_at'>
  & { creator: (
    { __typename?: 'users' }
    & Pick<Users, 'name' | 'public_id'>
  ), updator: (
    { __typename?: 'users' }
    & Pick<Users, 'name' | 'public_id'>
  ) }
);

export type GetShoppingListQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetShoppingListQuery = (
  { __typename?: 'query_root' }
  & { shopping_lists_by_pk?: Maybe<(
    { __typename?: 'shopping_lists' }
    & { shopping_list_items: Array<(
      { __typename?: 'shopping_list_items' }
      & ShoppingListItemDataFragment
    )> }
    & ShoppingListDataFragment
  )> }
);

export type SubscribeShoppingListSubscriptionVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type SubscribeShoppingListSubscription = (
  { __typename?: 'subscription_root' }
  & { shopping_lists_by_pk?: Maybe<(
    { __typename?: 'shopping_lists' }
    & { shopping_list_items: Array<(
      { __typename?: 'shopping_list_items' }
      & ShoppingListItemDataFragment
    )> }
    & ShoppingListDataFragment
  )> }
);

export type JoinShoppingListMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type JoinShoppingListMutation = (
  { __typename?: 'mutation_root' }
  & { join_shopping_list?: Maybe<(
    { __typename?: 'JoinShoppingListOutput' }
    & Pick<JoinShoppingListOutput, 'shopping_list_id'>
  )> }
);

export type CreateShoppingListItemMutationVariables = Exact<{
  shopping_list_id: Scalars['uuid'];
  title: Scalars['String'];
}>;


export type CreateShoppingListItemMutation = (
  { __typename?: 'mutation_root' }
  & { insert_shopping_list_items_one?: Maybe<(
    { __typename?: 'shopping_list_items' }
    & ShoppingListItemDataFragment
  )> }
);

export type DeleteShoppingListItemMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type DeleteShoppingListItemMutation = (
  { __typename?: 'mutation_root' }
  & { delete_shopping_list_items_by_pk?: Maybe<(
    { __typename?: 'shopping_list_items' }
    & Pick<Shopping_List_Items, 'id'>
  )> }
);

export type UpdateShoppingListItemMutationVariables = Exact<{
  id: Scalars['uuid'];
  set_input: Shopping_List_Items_Set_Input;
}>;


export type UpdateShoppingListItemMutation = (
  { __typename?: 'mutation_root' }
  & { update_shopping_list_items_by_pk?: Maybe<(
    { __typename?: 'shopping_list_items' }
    & ShoppingListItemDataFragment
  )> }
);

export const CurrentUserDataFragmentDoc = gql`
    fragment CurrentUserData on users {
  name
  public_id
}
    `;
export const UserDataFragmentDoc = gql`
    fragment UserData on users {
  name
  public_id
}
    `;
export const ActiveUserDataFragmentDoc = gql`
    fragment ActiveUserData on shopping_list_active_users {
  user {
    name
    public_id
  }
}
    `;
export const ShoppingListDataFragmentDoc = gql`
    fragment ShoppingListData on shopping_lists {
  id
  updated_at
  created_at
  title
  creator {
    ...UserData
  }
  active_users {
    ...ActiveUserData
  }
}
    ${UserDataFragmentDoc}
${ActiveUserDataFragmentDoc}`;
export const CreatedShoppingListsDataFragmentDoc = gql`
    fragment CreatedShoppingListsData on shopping_lists {
  ...ShoppingListData
}
    ${ShoppingListDataFragmentDoc}`;
export const JoinedShoppingListsDataFragmentDoc = gql`
    fragment JoinedShoppingListsData on shopping_list_active_users {
  shopping_list {
    ...ShoppingListData
  }
}
    ${ShoppingListDataFragmentDoc}`;
export const ChatMessageDataFragmentDoc = gql`
    fragment ChatMessageData on chat_messages {
  created_at
  creator {
    ...UserData
  }
  id
  message
}
    ${UserDataFragmentDoc}`;
export const ShoppingListItemDataFragmentDoc = gql`
    fragment ShoppingListItemData on shopping_list_items {
  id
  created_at
  creator {
    name
    public_id
  }
  is_completed
  title
  updated_at
  updator {
    name
    public_id
  }
}
    `;
export const GetCurrentUserDocument = gql`
    query getCurrentUser {
  current_user {
    id
    user {
      name
      public_id
    }
  }
}
    `;

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, baseOptions);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, baseOptions);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = ApolloReactCommon.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export const GetCreatedShoppingListsDocument = gql`
    query getCreatedShoppingLists {
  current_user {
    id
    user {
      created_shopping_lists {
        ...CreatedShoppingListsData
      }
      ...UserData
    }
  }
}
    ${CreatedShoppingListsDataFragmentDoc}
${UserDataFragmentDoc}`;

/**
 * __useGetCreatedShoppingListsQuery__
 *
 * To run a query within a React component, call `useGetCreatedShoppingListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCreatedShoppingListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCreatedShoppingListsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCreatedShoppingListsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCreatedShoppingListsQuery, GetCreatedShoppingListsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCreatedShoppingListsQuery, GetCreatedShoppingListsQueryVariables>(GetCreatedShoppingListsDocument, baseOptions);
      }
export function useGetCreatedShoppingListsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCreatedShoppingListsQuery, GetCreatedShoppingListsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCreatedShoppingListsQuery, GetCreatedShoppingListsQueryVariables>(GetCreatedShoppingListsDocument, baseOptions);
        }
export type GetCreatedShoppingListsQueryHookResult = ReturnType<typeof useGetCreatedShoppingListsQuery>;
export type GetCreatedShoppingListsLazyQueryHookResult = ReturnType<typeof useGetCreatedShoppingListsLazyQuery>;
export type GetCreatedShoppingListsQueryResult = ApolloReactCommon.QueryResult<GetCreatedShoppingListsQuery, GetCreatedShoppingListsQueryVariables>;
export const DeleteShoppingListDocument = gql`
    mutation deleteShoppingList($id: uuid!) {
  delete_shopping_lists_by_pk(id: $id) {
    id
  }
}
    `;
export type DeleteShoppingListMutationFn = ApolloReactCommon.MutationFunction<DeleteShoppingListMutation, DeleteShoppingListMutationVariables>;

/**
 * __useDeleteShoppingListMutation__
 *
 * To run a mutation, you first call `useDeleteShoppingListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteShoppingListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteShoppingListMutation, { data, loading, error }] = useDeleteShoppingListMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteShoppingListMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteShoppingListMutation, DeleteShoppingListMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteShoppingListMutation, DeleteShoppingListMutationVariables>(DeleteShoppingListDocument, baseOptions);
      }
export type DeleteShoppingListMutationHookResult = ReturnType<typeof useDeleteShoppingListMutation>;
export type DeleteShoppingListMutationResult = ApolloReactCommon.MutationResult<DeleteShoppingListMutation>;
export type DeleteShoppingListMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteShoppingListMutation, DeleteShoppingListMutationVariables>;
export const UpdateShoppingListDocument = gql`
    mutation updateShoppingList($id: uuid!, $set_input: shopping_lists_set_input!) {
  update_shopping_lists_by_pk(pk_columns: {id: $id}, _set: $set_input) {
    ...ShoppingListData
  }
}
    ${ShoppingListDataFragmentDoc}`;
export type UpdateShoppingListMutationFn = ApolloReactCommon.MutationFunction<UpdateShoppingListMutation, UpdateShoppingListMutationVariables>;

/**
 * __useUpdateShoppingListMutation__
 *
 * To run a mutation, you first call `useUpdateShoppingListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateShoppingListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateShoppingListMutation, { data, loading, error }] = useUpdateShoppingListMutation({
 *   variables: {
 *      id: // value for 'id'
 *      set_input: // value for 'set_input'
 *   },
 * });
 */
export function useUpdateShoppingListMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateShoppingListMutation, UpdateShoppingListMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateShoppingListMutation, UpdateShoppingListMutationVariables>(UpdateShoppingListDocument, baseOptions);
      }
export type UpdateShoppingListMutationHookResult = ReturnType<typeof useUpdateShoppingListMutation>;
export type UpdateShoppingListMutationResult = ApolloReactCommon.MutationResult<UpdateShoppingListMutation>;
export type UpdateShoppingListMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateShoppingListMutation, UpdateShoppingListMutationVariables>;
export const CreateShoppingListDocument = gql`
    mutation createShoppingList($title: String!) {
  insert_shopping_lists_one(object: {title: $title}) {
    ...ShoppingListData
  }
}
    ${ShoppingListDataFragmentDoc}`;
export type CreateShoppingListMutationFn = ApolloReactCommon.MutationFunction<CreateShoppingListMutation, CreateShoppingListMutationVariables>;

/**
 * __useCreateShoppingListMutation__
 *
 * To run a mutation, you first call `useCreateShoppingListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateShoppingListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createShoppingListMutation, { data, loading, error }] = useCreateShoppingListMutation({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateShoppingListMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateShoppingListMutation, CreateShoppingListMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateShoppingListMutation, CreateShoppingListMutationVariables>(CreateShoppingListDocument, baseOptions);
      }
export type CreateShoppingListMutationHookResult = ReturnType<typeof useCreateShoppingListMutation>;
export type CreateShoppingListMutationResult = ApolloReactCommon.MutationResult<CreateShoppingListMutation>;
export type CreateShoppingListMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateShoppingListMutation, CreateShoppingListMutationVariables>;
export const GetJoinedShoppingListsDocument = gql`
    query getJoinedShoppingLists {
  current_user {
    id
    user {
      public_id
      joined_shopping_lists {
        ...JoinedShoppingListsData
      }
    }
  }
}
    ${JoinedShoppingListsDataFragmentDoc}`;

/**
 * __useGetJoinedShoppingListsQuery__
 *
 * To run a query within a React component, call `useGetJoinedShoppingListsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetJoinedShoppingListsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetJoinedShoppingListsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetJoinedShoppingListsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetJoinedShoppingListsQuery, GetJoinedShoppingListsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetJoinedShoppingListsQuery, GetJoinedShoppingListsQueryVariables>(GetJoinedShoppingListsDocument, baseOptions);
      }
export function useGetJoinedShoppingListsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetJoinedShoppingListsQuery, GetJoinedShoppingListsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetJoinedShoppingListsQuery, GetJoinedShoppingListsQueryVariables>(GetJoinedShoppingListsDocument, baseOptions);
        }
export type GetJoinedShoppingListsQueryHookResult = ReturnType<typeof useGetJoinedShoppingListsQuery>;
export type GetJoinedShoppingListsLazyQueryHookResult = ReturnType<typeof useGetJoinedShoppingListsLazyQuery>;
export type GetJoinedShoppingListsQueryResult = ApolloReactCommon.QueryResult<GetJoinedShoppingListsQuery, GetJoinedShoppingListsQueryVariables>;
export const GetChatMessagesDocument = gql`
    query getChatMessages($shopping_list_item_id: uuid!) {
  shopping_list_items_by_pk(id: $shopping_list_item_id) {
    chat_messages(order_by: {created_at: asc}) {
      ...ChatMessageData
    }
    id
  }
}
    ${ChatMessageDataFragmentDoc}`;

/**
 * __useGetChatMessagesQuery__
 *
 * To run a query within a React component, call `useGetChatMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChatMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChatMessagesQuery({
 *   variables: {
 *      shopping_list_item_id: // value for 'shopping_list_item_id'
 *   },
 * });
 */
export function useGetChatMessagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetChatMessagesQuery, GetChatMessagesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetChatMessagesQuery, GetChatMessagesQueryVariables>(GetChatMessagesDocument, baseOptions);
      }
export function useGetChatMessagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetChatMessagesQuery, GetChatMessagesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetChatMessagesQuery, GetChatMessagesQueryVariables>(GetChatMessagesDocument, baseOptions);
        }
export type GetChatMessagesQueryHookResult = ReturnType<typeof useGetChatMessagesQuery>;
export type GetChatMessagesLazyQueryHookResult = ReturnType<typeof useGetChatMessagesLazyQuery>;
export type GetChatMessagesQueryResult = ApolloReactCommon.QueryResult<GetChatMessagesQuery, GetChatMessagesQueryVariables>;
export const SubscribeChatMessagesDocument = gql`
    subscription subscribeChatMessages($shopping_list_item_id: uuid!) {
  shopping_list_items_by_pk(id: $shopping_list_item_id) {
    chat_messages(order_by: {created_at: asc}) {
      ...ChatMessageData
    }
    id
  }
}
    ${ChatMessageDataFragmentDoc}`;

/**
 * __useSubscribeChatMessagesSubscription__
 *
 * To run a query within a React component, call `useSubscribeChatMessagesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeChatMessagesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeChatMessagesSubscription({
 *   variables: {
 *      shopping_list_item_id: // value for 'shopping_list_item_id'
 *   },
 * });
 */
export function useSubscribeChatMessagesSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<SubscribeChatMessagesSubscription, SubscribeChatMessagesSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<SubscribeChatMessagesSubscription, SubscribeChatMessagesSubscriptionVariables>(SubscribeChatMessagesDocument, baseOptions);
      }
export type SubscribeChatMessagesSubscriptionHookResult = ReturnType<typeof useSubscribeChatMessagesSubscription>;
export type SubscribeChatMessagesSubscriptionResult = ApolloReactCommon.SubscriptionResult<SubscribeChatMessagesSubscription>;
export const CreateChatMessageDocument = gql`
    mutation createChatMessage($shopping_list_item_id: uuid!, $message: String!) {
  insert_chat_messages_one(object: {shopping_list_item_id: $shopping_list_item_id, message: $message}) {
    ...ChatMessageData
  }
}
    ${ChatMessageDataFragmentDoc}`;
export type CreateChatMessageMutationFn = ApolloReactCommon.MutationFunction<CreateChatMessageMutation, CreateChatMessageMutationVariables>;

/**
 * __useCreateChatMessageMutation__
 *
 * To run a mutation, you first call `useCreateChatMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChatMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChatMessageMutation, { data, loading, error }] = useCreateChatMessageMutation({
 *   variables: {
 *      shopping_list_item_id: // value for 'shopping_list_item_id'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useCreateChatMessageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateChatMessageMutation, CreateChatMessageMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateChatMessageMutation, CreateChatMessageMutationVariables>(CreateChatMessageDocument, baseOptions);
      }
export type CreateChatMessageMutationHookResult = ReturnType<typeof useCreateChatMessageMutation>;
export type CreateChatMessageMutationResult = ApolloReactCommon.MutationResult<CreateChatMessageMutation>;
export type CreateChatMessageMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateChatMessageMutation, CreateChatMessageMutationVariables>;
export const GetShoppingListDocument = gql`
    query getShoppingList($id: uuid!) {
  shopping_lists_by_pk(id: $id) {
    ...ShoppingListData
    shopping_list_items {
      ...ShoppingListItemData
    }
  }
}
    ${ShoppingListDataFragmentDoc}
${ShoppingListItemDataFragmentDoc}`;

/**
 * __useGetShoppingListQuery__
 *
 * To run a query within a React component, call `useGetShoppingListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetShoppingListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetShoppingListQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetShoppingListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetShoppingListQuery, GetShoppingListQueryVariables>) {
        return ApolloReactHooks.useQuery<GetShoppingListQuery, GetShoppingListQueryVariables>(GetShoppingListDocument, baseOptions);
      }
export function useGetShoppingListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetShoppingListQuery, GetShoppingListQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetShoppingListQuery, GetShoppingListQueryVariables>(GetShoppingListDocument, baseOptions);
        }
export type GetShoppingListQueryHookResult = ReturnType<typeof useGetShoppingListQuery>;
export type GetShoppingListLazyQueryHookResult = ReturnType<typeof useGetShoppingListLazyQuery>;
export type GetShoppingListQueryResult = ApolloReactCommon.QueryResult<GetShoppingListQuery, GetShoppingListQueryVariables>;
export const SubscribeShoppingListDocument = gql`
    subscription subscribeShoppingList($id: uuid!) {
  shopping_lists_by_pk(id: $id) {
    ...ShoppingListData
    shopping_list_items {
      ...ShoppingListItemData
    }
  }
}
    ${ShoppingListDataFragmentDoc}
${ShoppingListItemDataFragmentDoc}`;

/**
 * __useSubscribeShoppingListSubscription__
 *
 * To run a query within a React component, call `useSubscribeShoppingListSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeShoppingListSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeShoppingListSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSubscribeShoppingListSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<SubscribeShoppingListSubscription, SubscribeShoppingListSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<SubscribeShoppingListSubscription, SubscribeShoppingListSubscriptionVariables>(SubscribeShoppingListDocument, baseOptions);
      }
export type SubscribeShoppingListSubscriptionHookResult = ReturnType<typeof useSubscribeShoppingListSubscription>;
export type SubscribeShoppingListSubscriptionResult = ApolloReactCommon.SubscriptionResult<SubscribeShoppingListSubscription>;
export const JoinShoppingListDocument = gql`
    mutation joinShoppingList($id: uuid!) {
  join_shopping_list(shopping_list_id: $id) {
    shopping_list_id
  }
}
    `;
export type JoinShoppingListMutationFn = ApolloReactCommon.MutationFunction<JoinShoppingListMutation, JoinShoppingListMutationVariables>;

/**
 * __useJoinShoppingListMutation__
 *
 * To run a mutation, you first call `useJoinShoppingListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinShoppingListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinShoppingListMutation, { data, loading, error }] = useJoinShoppingListMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useJoinShoppingListMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<JoinShoppingListMutation, JoinShoppingListMutationVariables>) {
        return ApolloReactHooks.useMutation<JoinShoppingListMutation, JoinShoppingListMutationVariables>(JoinShoppingListDocument, baseOptions);
      }
export type JoinShoppingListMutationHookResult = ReturnType<typeof useJoinShoppingListMutation>;
export type JoinShoppingListMutationResult = ApolloReactCommon.MutationResult<JoinShoppingListMutation>;
export type JoinShoppingListMutationOptions = ApolloReactCommon.BaseMutationOptions<JoinShoppingListMutation, JoinShoppingListMutationVariables>;
export const CreateShoppingListItemDocument = gql`
    mutation createShoppingListItem($shopping_list_id: uuid!, $title: String!) {
  insert_shopping_list_items_one(object: {shopping_list_id: $shopping_list_id, title: $title}) {
    ...ShoppingListItemData
  }
}
    ${ShoppingListItemDataFragmentDoc}`;
export type CreateShoppingListItemMutationFn = ApolloReactCommon.MutationFunction<CreateShoppingListItemMutation, CreateShoppingListItemMutationVariables>;

/**
 * __useCreateShoppingListItemMutation__
 *
 * To run a mutation, you first call `useCreateShoppingListItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateShoppingListItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createShoppingListItemMutation, { data, loading, error }] = useCreateShoppingListItemMutation({
 *   variables: {
 *      shopping_list_id: // value for 'shopping_list_id'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateShoppingListItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateShoppingListItemMutation, CreateShoppingListItemMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateShoppingListItemMutation, CreateShoppingListItemMutationVariables>(CreateShoppingListItemDocument, baseOptions);
      }
export type CreateShoppingListItemMutationHookResult = ReturnType<typeof useCreateShoppingListItemMutation>;
export type CreateShoppingListItemMutationResult = ApolloReactCommon.MutationResult<CreateShoppingListItemMutation>;
export type CreateShoppingListItemMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateShoppingListItemMutation, CreateShoppingListItemMutationVariables>;
export const DeleteShoppingListItemDocument = gql`
    mutation deleteShoppingListItem($id: uuid!) {
  delete_shopping_list_items_by_pk(id: $id) {
    id
  }
}
    `;
export type DeleteShoppingListItemMutationFn = ApolloReactCommon.MutationFunction<DeleteShoppingListItemMutation, DeleteShoppingListItemMutationVariables>;

/**
 * __useDeleteShoppingListItemMutation__
 *
 * To run a mutation, you first call `useDeleteShoppingListItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteShoppingListItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteShoppingListItemMutation, { data, loading, error }] = useDeleteShoppingListItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteShoppingListItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteShoppingListItemMutation, DeleteShoppingListItemMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteShoppingListItemMutation, DeleteShoppingListItemMutationVariables>(DeleteShoppingListItemDocument, baseOptions);
      }
export type DeleteShoppingListItemMutationHookResult = ReturnType<typeof useDeleteShoppingListItemMutation>;
export type DeleteShoppingListItemMutationResult = ApolloReactCommon.MutationResult<DeleteShoppingListItemMutation>;
export type DeleteShoppingListItemMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteShoppingListItemMutation, DeleteShoppingListItemMutationVariables>;
export const UpdateShoppingListItemDocument = gql`
    mutation updateShoppingListItem($id: uuid!, $set_input: shopping_list_items_set_input!) {
  update_shopping_list_items_by_pk(pk_columns: {id: $id}, _set: $set_input) {
    ...ShoppingListItemData
  }
}
    ${ShoppingListItemDataFragmentDoc}`;
export type UpdateShoppingListItemMutationFn = ApolloReactCommon.MutationFunction<UpdateShoppingListItemMutation, UpdateShoppingListItemMutationVariables>;

/**
 * __useUpdateShoppingListItemMutation__
 *
 * To run a mutation, you first call `useUpdateShoppingListItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateShoppingListItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateShoppingListItemMutation, { data, loading, error }] = useUpdateShoppingListItemMutation({
 *   variables: {
 *      id: // value for 'id'
 *      set_input: // value for 'set_input'
 *   },
 * });
 */
export function useUpdateShoppingListItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateShoppingListItemMutation, UpdateShoppingListItemMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateShoppingListItemMutation, UpdateShoppingListItemMutationVariables>(UpdateShoppingListItemDocument, baseOptions);
      }
export type UpdateShoppingListItemMutationHookResult = ReturnType<typeof useUpdateShoppingListItemMutation>;
export type UpdateShoppingListItemMutationResult = ApolloReactCommon.MutationResult<UpdateShoppingListItemMutation>;
export type UpdateShoppingListItemMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateShoppingListItemMutation, UpdateShoppingListItemMutationVariables>;