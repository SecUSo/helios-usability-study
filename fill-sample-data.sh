#!/bin/bash

for i in $(seq 0 9); do
  echo "    {" >> out.txt
  echo "      \"user\": \"N0$i\"," >> out.txt
  echo "      \"subject_id\": \"N0$i\"," >> out.txt
  echo "      \"experiment_type\": \"NE\"" >> out.txt
  echo "    }," >> out.txt
done

for i in $(seq 10 49); do
  echo "    {" >> out.txt
  echo "      \"user\": \"N$i\"," >> out.txt
  echo "      \"subject_id\": \"N$i\"," >> out.txt
  echo "      \"experiment_type\": \"NE\"" >> out.txt
  echo "    }," >> out.txt
done

for i in $(seq 0 9); do
  echo "    {" >> out.txt
  echo "      \"user\": \"B0$i\"," >> out.txt
  echo "      \"subject_id\": \"B0$i\"," >> out.txt
  echo "      \"experiment_type\": \"BE\"" >> out.txt
  echo "    }," >> out.txt
done

for i in $(seq 10 49); do
  echo "    {" >> out.txt
  echo "      \"user\": \"B$i\"," >> out.txt
  echo "      \"subject_id\": \"B$i\"," >> out.txt
  echo "      \"experiment_type\": \"BE\"" >> out.txt
  echo "    }," >> out.txt
done
