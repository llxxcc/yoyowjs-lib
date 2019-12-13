import { Apis } from "yoyowjs-ws";
import { ChainStore, PrivateKey, TransactionHelper } from "../lib";

let order = '1.12.118'
let active_key = "5KV3RG172g6wcsainBmdpPFYAFBniWxJkFSLJh2YY46VkkBJeVh";
let private_key = PrivateKey.fromWif(active_key);
let fee_paying_account = 30833
let op_data = { order, fee_paying_account }

let transfer = async () => {
  let fees = await TransactionHelper.process_transaction('limit_order_cancel', op_data, fee_paying_account);
  // console.log('get fees : ', fees);
  let result = await TransactionHelper.process_transaction('limit_order_cancel', op_data, fee_paying_account, true, true, private_key, true)
  console.log('process result : ', result);
  process.exit(0);
}

Apis.instance("ws://192.168.0.202:8090", true)
  .init_promise.then((res) => {
    console.log("connected to:", res[0].network_name, "network");
    ChainStore.init().then(() => transfer());
  });


