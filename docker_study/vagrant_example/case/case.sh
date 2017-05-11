#!/bin/bash
if [ -z "$STR" ]; then
    echo "No STR string specified."
    exit 0
fi
if [ -z "$TO_CASE" ]; then
    echo "No TO_CASE specified."
    exit 0
fi
if [ "$TO_CASE" = "upper" ]; then
    echo "${STR^^*}"
    exit 0
fi
if [ "$TO_CASE" = "lower" ]; then
    echo "${STR,,*}"
    exit 0
fi
echo "TO_CASE was not upper or lower"