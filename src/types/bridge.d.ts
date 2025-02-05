import { ProtocolWithReturn } from "webext-bridge"

export interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

declare module "webext-bridge" {
  export interface ProtocolMap {
    getTodo: ProtocolWithReturn<{ id: string }, Todo>
  }
}
