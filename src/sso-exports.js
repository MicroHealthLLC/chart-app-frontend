let baseURL = "https://dev.d2euw41san1usf.amplifyapp.com/"
let graphQLEndpoint = "https://flbeizkcb5hifcb5aqk3p34woq.appsync-api.us-east-1.amazonaws.com/graphql"

if (process.env.NODE_ENV == "development") {
    console.log(process.env)
    baseURL = "http://localhost:8080/"
    graphQLEndpoint = "http://100.109.142.69:20002"
    // graphQLEndpoint = process.env.VUE_APP_GRAPHQL_ENDPOINT
}

const awsmobile = {
    "aws_project_region": "us-east-1",
    "aws_cognito_identity_pool_id": "us-east-1:5e606a81-8650-473f-9c4a-b64514bcef72",
    "aws_cognito_region": "us-east-1",
    "aws_user_pools_id": "us-east-1_NRnGGLKpU",
    "aws_user_pools_web_client_id": "2ktuc5g8fcuq3ibo4v9jqqgstu", 
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
    // "aws_appsync_authenticationType": "API_KEY",
    "aws_appsync_apiKey": "da2-2yyee5l2ejblblrkk7bwdrjv4e",
    "aws_appsync_dangerously_connect_to_http_endpoint_for_testing": true,
};


export default awsmobile;
