export type StorageDataType = Record<string, any>
export type StorageKeyType<S extends StorageDataType> = string & keyof S
export type StorageArea = "local" | "sync" | "session"
export type StorageUpdate<S extends StorageDataType> = {
  [Key in keyof S]?: {
    newValue?: S[Key] | ""
    oldValue?: S[Key] | ""
  }
}

export type StorageGetter<S extends StorageDataType> = <
  Key extends StorageKeyType<S> | StorageKeyType<S>[],
>(
  keyOrKeys: Key,
) => Key extends StorageKeyType<S>
  ? Promise<S[Key]>
  : Promise<Pick<S, Key[number]>>

export type StorageSetter<S extends StorageDataType> = <
  KeyOrItems extends StorageKeyType<S> | Partial<S>,
>(
  ...args: KeyOrItems extends StorageKeyType<S>
    ? [key: KeyOrItems, value: S[KeyOrItems] | undefined]
    : [items: KeyOrItems]
) => Promise<boolean>

export type StorageRemover<S extends StorageDataType> = (
  keyOrKeys: StorageKeyType<S> | StorageKeyType<S>[],
) => Promise<boolean>

export type StorageAreaApi<S extends StorageDataType> = {
  get: StorageGetter<S>
  set: StorageSetter<S>
  remove: StorageRemover<S>
  clear: () => Promise<unknown>
}
