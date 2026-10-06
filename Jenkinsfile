pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.62.1-noble'
    }
  }

  options {
    timestamps()
    timeout(time: 30, unit: 'MINUTES')
  }

  environment {
    CI = 'true'
  }

  stages {
    stage('Install dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('UI tests') {
      steps {
        sh 'npm run test:e2e'
      }
    }

    stage('API tests') {
      steps {
        sh 'npm run test:api'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true
    }
  }
}