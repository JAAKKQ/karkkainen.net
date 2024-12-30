pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
                nodejs('NodeJS LTS'){
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage('Deploy'){
            steps {
                sh 'tar -czf html.tar.gz -C dist/ .'

                script {
                    // CHANGE THIS TO THE WEBSITE DOMAIN!
                    def domain = 'karkkainen.net'
                    //____________________________________

                    // ADD THE SERVERS!
                    def devServers = [
                            'HEL-WWW1'
                    ]
                    def prodServers = [
                            'HEL-WWW1'
                    ]
                    //____________________________________

                    if(env.BRANCH_NAME == 'main'){
                        prodServers.each{ server ->
                            deploy(server, domain)
                        }   
                    } else {
                        devServers.each{ server ->
                            deploy(server, domain)
                        }   
                    }
                }
            }
        }
    }
}

def deploy(server, domain){
    stage("Deploying to ${server}"){
        sshPublisher failOnError: true, 
        publishers: [
            sshPublisherDesc(
                configName: server, 
                transfers: [
                    sshTransfer(
                        cleanRemote: false,
                        excludes: '*', 
                        execCommand: "bash /home/jenkins-distributor/scripts/newsite.sh $domain && find /var/www/$domain -mindepth 1 -maxdepth 1 ! -name '.well-known' -exec rm -rf {} +", 
                        flatten: false, 
                        makeEmptyDirs: false, 
                        noDefaultExcludes: false, 
                        patternSeparator: '[, ]+', 
                        remoteDirectory: domain, 
                        remoteDirectorySDF: false, 
                    ),
                    sshTransfer(
                        cleanRemote: false,
                        excludes: '', 
                        execCommand: "tar -xf /var/www/$domain/html.tar.gz -C /var/www/$domain/ && rm /var/www/$domain/html.tar.gz", 
                        flatten: false, 
                        makeEmptyDirs: false, 
                        noDefaultExcludes: false, 
                        patternSeparator: '[, ]+', 
                        remoteDirectory: domain, 
                        remoteDirectorySDF: false, 
                        sourceFiles: 'html.tar.gz'
                    )
                ], 
                usePromotionTimestamp: false, 
                useWorkspaceInPromotion: false, 
                verbose: false
            )
        ]
    }
}