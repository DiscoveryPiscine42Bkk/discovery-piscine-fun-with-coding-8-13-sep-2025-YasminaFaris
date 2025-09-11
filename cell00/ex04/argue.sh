#!/bin/sh

if [ $# -eq 0 ]; then
  echo "No arguments supplied"
else
  i=0
  for arg in "$@"
  do
    echo "$arg"
    i=$((i+1))
    [ $i -eq 3 ] && break
  done
fi
