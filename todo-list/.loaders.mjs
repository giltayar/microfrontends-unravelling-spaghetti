export * from '@multiloader/loader'
import configureLoader from '@multiloader/loader'
import * as babelRegisterEsm from 'babel-register-esm'
import * as testdouble from 'testdouble'

configureLoader(testdouble, babelRegisterEsm)
