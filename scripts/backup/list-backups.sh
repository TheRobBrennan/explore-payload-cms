#!/bin/bash

# Script to list available PostgreSQL database backups

BACKUP_DIR="../../backups"

# Check if backup directory exists
if [ ! -d "${BACKUP_DIR}" ]; then
  echo "Backup directory not found: ${BACKUP_DIR}"
  exit 1
fi

# Count backup files
BACKUP_COUNT=$(ls -1 ${BACKUP_DIR}/postgres_backup_*.sql 2>/dev/null | wc -l)

if [ "${BACKUP_COUNT}" -eq 0 ]; then
  echo "No backup files found in ${BACKUP_DIR}"
  exit 0
fi

echo "Found ${BACKUP_COUNT} backup file(s):"
echo "----------------------------------------"
echo "ID | Filename | Date | Size"
echo "----------------------------------------"

# List backup files with ID numbers
ID=1
for BACKUP_FILE in $(ls -t ${BACKUP_DIR}/postgres_backup_*.sql 2>/dev/null); do
  FILENAME=$(basename ${BACKUP_FILE})
  DATE_PART=$(echo ${FILENAME} | sed 's/postgres_backup_\([0-9]\{8\}_[0-9]\{6\}\).*/\1/')
  FORMATTED_DATE=$(echo ${DATE_PART} | sed 's/\([0-9]\{8\}\)_\([0-9]\{6\}\)/\1 \2/' | sed 's/\([0-9]\{4\}\)\([0-9]\{2\}\)\([0-9]\{2\}\) \([0-9]\{2\}\)\([0-9]\{2\}\)\([0-9]\{2\}\)/\1-\2-\3 \4:\5:\6/')
  SIZE=$(du -h ${BACKUP_FILE} | cut -f1)
  
  echo "${ID} | ${FILENAME} | ${FORMATTED_DATE} | ${SIZE}"
  ID=$((ID+1))
done

echo "----------------------------------------"
echo "Use 'npm run backups:restore:id <ID>' to restore a specific backup"
