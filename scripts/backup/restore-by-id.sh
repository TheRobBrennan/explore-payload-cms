#!/bin/bash

# Script to restore PostgreSQL database from a backup file by ID

# Check if an ID was specified
if [ -z "$1" ] || [ "$1" == "--yes" ]; then
  echo "Error: Please specify a backup ID to restore."
  echo "Use 'npm run backups:list' to see available backups."
  exit 1
fi

BACKUP_DIR="../../backups"
ID=$1

# Check if backup directory exists
if [ ! -d "${BACKUP_DIR}" ]; then
  echo "Error: Backup directory not found: ${BACKUP_DIR}"
  exit 1
fi

# Get the backup file by ID
BACKUP_FILE=$(ls -t ${BACKUP_DIR}/postgres_backup_*.sql 2>/dev/null | sed -n "${ID}p")

if [ -z "${BACKUP_FILE}" ]; then
  echo "Error: No backup found with ID ${ID}!"
  echo "Use 'npm run backups:list' to see available backups."
  exit 1
fi

# Check for --yes flag to skip confirmation
if [[ "$*" != *"--yes"* ]]; then
  echo "Warning: This will overwrite the current database with the backup: $(basename ${BACKUP_FILE})"
  echo "All current data will be lost!"
  read -p "Are you sure you want to continue? (y/N): " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Restore cancelled."
    exit 0
  fi
fi

echo "Restoring PostgreSQL database from backup: $(basename ${BACKUP_FILE})"

# Get database credentials from .env file
if [ -f "../../.env" ]; then
  source <(grep -v '^#' ../../.env | sed -E 's/(.*)=(.*)$/export \1="\2"/g')
else
  echo "Error: .env file not found!"
  exit 1
fi

# Use docker compose to restore the database
cat ${BACKUP_FILE} | docker compose exec -T postgres psql -U ${POSTGRES_USER:-postgres} ${POSTGRES_DB:-payloadcms}

if [ $? -eq 0 ]; then
  echo "Database restored successfully from: $(basename ${BACKUP_FILE})"
else
  echo "Error: Database restore failed!"
  exit 1
fi
