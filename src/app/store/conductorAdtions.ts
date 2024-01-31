import { createAction, props } from "@ngrx/store"
import { conductor } from "../entities/conductor"

export const setConductorAction = createAction("[App] [conductor] set conductor", props<{conductor: conductor}>())

export const conductortActions = {
  setConductorAction
}