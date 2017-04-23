#!/bin/bash
CT="Content-Type:application/json"
REQ="curl -i -H$CT -X GET http://localhost:3000/api/seeds/clear"
echo $REQ
RESPONSE=`$REQ`
echo $RESPONSE