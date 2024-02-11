import { createAction, props } from "@ngrx/store"
import { conductor } from "../entities/conductor"

const setConductorAction = createAction("[App] [conductor] set conductor", props<{conductor: conductor}>())
const updateConductorAction = createAction("[App] [conductor] update Conductor", props<{name: string, email: string, id: string}>()) 
const loadConductorAction = createAction("[App] [conductor] load Conductor")
const successConductorAction = createAction("[App] [conductor] success")

export const conductortActions = {
  setConductorAction,
  updateConductorAction,
  loadConductorAction,
  successConductorAction
}