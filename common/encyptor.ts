import {
    KmsKeyringNode, buildClient,CommitmentPolicy} from '@aws-crypto/client-node'
import { BadRequest } from '../app/exceptions/request'

  const { encrypt, decrypt } = buildClient(
    CommitmentPolicy.REQUIRE_ENCRYPT_REQUIRE_DECRYPT
  )

  const generatorKeyId = process.env.KMS_GENERATOR_ID
  
  const keyIds = [process.env.KMS_KEY_ID] as string[]

  const keyring = new KmsKeyringNode({ generatorKeyId, keyIds })
  
  export async function encryptData(userEmail:string, data:string) {
    const context = {
        userEmail: userEmail
    }
  
    const { result } = await encrypt(keyring, data, {
        encryptionContext: context,
      })
    return result
    }
  

    export async function decryptData(result:Buffer, context: {userEmail:string}) {
        const { plaintext, messageHeader } = await decrypt(keyring, result)
        if( messageHeader.encryptionContext['userEmail'] !== context.userEmail) {
            throw new BadRequest()
        }
       return plaintext
    }

  