let baseURL = "https://main.d2j3rqrosasfg6.amplifyapp.com/"
let graphQLEndpoint = "https://7xkqultz5bhrphqoxyhpoya4ha.appsync-api.us-east-1.amazonaws.com/graphql"

if (process.env.NODE_ENV == "development") {
    console.log(process.env)
    baseURL = "http://localhost:8080/"
    graphQLEndpoint = process.env.VUE_APP_GRAPHQL_ENDPOINT
}

const awsmobile = {
    "aws_project_region": "us-east-1",
    "aws_cognito_identity_pool_id": "us-east-1:5e606a81-8650-473f-9c4a-b64514bcef72",
    "aws_cognito_region": "us-east-1",
    "aws_user_pools_id": "us-east-1_HiQbs5T3Y",
    "aws_user_pools_web_client_id": "4u1qnmobmlnqem4q5ha108lqds",
    "oauth": {
      domain: "mrms-beta.auth.us-east-1.amazoncognito.com",
      scope: ["email", "openid", "phone", "aws.cognito.signin.user.admin"],
      redirectSignIn: `${baseURL}`,
      redirectSignOut: `${baseURL}`,
      responseType: "code"
    },
    "aws_cognito_username_attributes": [
        "EMAIL"
    ],
    "aws_cognito_social_providers": [],
    "aws_cognito_signup_attributes": [
        "EMAIL"
    ],
    "aws_cognito_mfa_configuration": "OPTIONAL",
    "aws_cognito_mfa_types": [
        "SMS",
        "TOTP"
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": []
    },
    "aws_cognito_verification_mechanisms": [
        "PHONE_NUMBER"
    ],
    "aws_appsync_graphqlEndpoint": `${graphQLEndpoint}`,
    "aws_appsync_region": "us-east-1",
    "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS",
    "aws_appsync_dangerously_connect_to_http_endpoint_for_testing": true,
};


export default awsmobile;
