git remote -v | grep upstream

res=`echo $?`

if [ $res != "0" ]; then 
    echo "upstream is not exsit!!!"
    exit 1
fi

#upstream is exist
git merge upstream/master

echo "Don't forget push after merge."
