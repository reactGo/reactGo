function error_exit {
    # Display error message and exit
    echo "${1: -"Unknown Error"}" 1>&2
    exit 1;
}

echo "****fetching upstream..."
git fetch upstream || error_exit "ERROR: >>>>fetch upstream failed."
echo "****switch to master branch"
git checkout master || error_exit "ERROR: >>>>switch to master branch failed."
echo "****merge upstream to master"
git merge upstream/master || error_exit "ERROR: >>>>merge upstream to master failed."
echo "****switch back to kdev branch"
git checkout kdev || error_exit "ERROR: >>>>switch back to kdev branch failed."
