#!/bin/bash

truncate -s 0 .env.example;
grep -E -o "^[A-Za-z_]*=" .env  | while read -r line ; do 
echo  $line >> .env.example; done
