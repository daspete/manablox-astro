import type { User } from 'lucia'
import { atom } from 'nanostores'

export const $currentUser = atom<User | null>(null)
