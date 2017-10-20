#!/bin/bash

key=$1
strkey=$(hexdump -v -e '16/1 "%02x"' $key)

iv=$(printf '%032x' 0x0)

openssl aes-128-cbc -d -in $2 -out $3.ts -nosalt -iv $iv -K $strkey
ffmpeg -i $3.ts -acodec copy -vcodec copy -absf aac_adtstoasc $4.mp4

