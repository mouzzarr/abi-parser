import { AbiCoder } from 'ethers'

import { hexify } from '../hexify'
import { CallDataInformation } from '../parameter-map'

import { AMAROK_PAYLOAD_ABI } from './abis/amarok'

// TODO: Create unit test wih this data
// 0x0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000044d51423298160e91492da091acd9acd6697bab0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000010ed43c718714eb63d5aa57b78b54704e256024e00000000000000000000000010ed43c718714eb63d5aa57b78b54704e256024e0000000000000000000000001af3f329e8be154074d8769d1ffa4ee058b1dbc300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f176bfca6293ced00000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000010418cbafe50000000000000000000000000000000000000000000000000f176bfca6293ced000000000000000000000000000000000000000000000000000fb29df7ac71a000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000be27f03c8e6a61e2a4b1ee7940dbcb9204744d1c0000000000000000000000000000000000000000000000000000000064c92b7700000000000000000000000000000000000000000000000000000000000000020000000000000000000000001af3f329e8be154074d8769d1ffa4ee058b1dbc3000000000000000000000000bb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c00000000000000000000000000000000000000000000000000000000
//
export const parseAmarok = (
  encodedCallData: string
): Array<CallDataInformation> => {
  try {
    const functionParameters = AbiCoder.defaultAbiCoder().decode(
      AMAROK_PAYLOAD_ABI,
      hexify(encodedCallData)
    )

    // For currently unknown reason, `decode` sometimes returns an object where accessing the first element fails
    // This is a workaround for that
    try {
      const [xxx] = functionParameters

      if (!xxx) {
        console.log('never gonna happen')
      }
    } catch (e) {
      return []
    }

    return [
      {
        functionName: 'unnamed (amarok)',
        rawCallData: encodedCallData,
        functionParameters,
      } as CallDataInformation,
    ]
  } catch (e) {
    return []
  }
}
