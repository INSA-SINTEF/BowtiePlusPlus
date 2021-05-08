#!/bin/bash

truncate -s 0 .env.example;
grep -E -o "^.*=" settings.py  | while read -r line ; do 
echo  $line >> .env.example; done
