import { execSync } from 'node:child_process'

const clearDb = () => {
  execSync('npx knex migrate:rollback --all')
}

const loadMigrations = () => {
  execSync('npx knex migrate:latest')
}

export const handleDb = {
  clearDb,
  loadMigrations,
}
