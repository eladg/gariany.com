#!/bin/bash
echo "================================================================================"
echo "Building..."
echo "================================================================================"
cd ../ && hugo && cd scripts

echo ""
echo ""
echo "> Done!"
echo ""

echo "================================================================================"
echo "Deploying to s3..."
echo "================================================================================"
# old aws s3 sync way:
# cd ../public && aws --profile aws_gariany s3 sync . s3://gariany.com --exclude "*" --include "*.html" && cd ../scripts

# install s3deploy using: `brew install bep/tap/s3deploy`
# more info: https://github.com/bep/s3deploy

export AWS_SDK_LOAD_CONFIG=1
/usr/local/bin/s3deploy -source ../public -bucket gariany.com -region us-east-1 -distribution-id E1OEXPS7LRFGE -public-access -v

echo "================================================================================"
echo ""
echo ""
echo "> Done!"
echo ""

echo "================================================================================"
echo "Completed."
echo "================================================================================"
echo ""
