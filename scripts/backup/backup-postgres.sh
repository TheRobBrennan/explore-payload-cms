#!/bin/bash

# Script to backup PostgreSQL database from Docker container

# Get current date and time for the backup filename
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="../../backups"
BACKUP_FILE="${BACKUP_DIR}/postgres_backup_${TIMESTAMP}.sql"

# Ensure backup directory exists
mkdir -p ${BACKUP_DIR}

echo "Creating PostgreSQL database backup..."

# Get database credentials from .env file
if [ -f "../../.env" ]; then
  source <(grep -v '^#' ../../.env | sed -E 's/(.*)=(.*)$/export \1="\2"/g')
else
  echo "Error: .env file not found!"
  exit 1
fi

# Use docker compose to execute pg_dump
docker compose exec -T postgres pg_dump -U ${POSTGRES_USER:-postgres} ${POSTGRES_DB:-payloadcms} > ${BACKUP_FILE}

if [ $? -eq 0 ]; then
  echo "Backup created successfully: ${BACKUP_FILE}"
  echo "Backup size: $(du -h ${BACKUP_FILE} | cut -f1)"
else
  echo "Error: Backup failed!"
  exit 1
fi
