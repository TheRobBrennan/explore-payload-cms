#!/bin/bash

# Script to restore PostgreSQL database from a backup file

# Check if a backup file was specified
if [ -z "$1" ] || [ "$1" == "--yes" ]; then
  # Get the latest backup file if none specified
  BACKUP_DIR="../../backups"
  LATEST_BACKUP=$(ls -t ${BACKUP_DIR}/postgres_backup_*.sql 2>/dev/null | head -1)
  
  if [ -z "${LATEST_BACKUP}" ]; then
    echo "Error: No backup files found in ${BACKUP_DIR}!"
    exit 1
  fi
  
  BACKUP_FILE="${LATEST_BACKUP}"
else
  BACKUP_FILE="$1"
  
  # Check if the specified backup file exists
  if [ ! -f "${BACKUP_FILE}" ]; then
    echo "Error: Backup file ${BACKUP_FILE} not found!"
    exit 1
  fi
fi

# Check for --yes flag to skip confirmation
if [[ "$*" != *"--yes"* ]]; then
  echo "Warning: This will overwrite the current database with the backup from: ${BACKUP_FILE}"
  echo "All current data will be lost!"
  read -p "Are you sure you want to continue? (y/N): " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Restore cancelled."
    exit 0
  fi
fi

echo "Restoring PostgreSQL database from backup: ${BACKUP_FILE}"

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
  echo "Database restored successfully from: ${BACKUP_FILE}"
else
  echo "Error: Database restore failed!"
  exit 1
fi
