npm run start > server.log 2>&1 &
SERVER_PID=$!
sleep 2
curl -s -i http://127.0.0.1:8787 > result.txt
cat result.txt
kill $SERVER_PID
