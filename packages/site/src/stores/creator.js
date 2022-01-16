import { makeAutoObservable } from 'mobx'
import handleError from 'site/services/error-handler'
import * as srv from 'site/services'

export default class CreatorStore {
  selected = null

  constructor() {
    makeAutoObservable(this)
  }

  reset = () => {
    this.selected = null
  }

  select = (selected) => {
    if (this.selected && this.selected.id === selected.id) {
      this.selected = null
      return
    }
    this.selected = selected
  }

  replace = (newValue) => {
    this.selected = { ...newValue }
  }

  * fetchProfile(username) {
    try {
      const response = yield srv.fetchCreatorByUsername(username)
      if (response.ok) {
        this.selected = response.data.creator
        return response.data
      }
      throw handleError(response)
    } catch (error) {
      return null
    } finally {
      this.loading = false
    }
  }
}
