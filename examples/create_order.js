import { Apis } from "yoyowjs-ws";
import { ChainStore, PrivateKey, TransactionHelper } from "../lib";

let seller = 30833
let active_key = "5KV3RG172g6wcsainBmdpPFYAFBniWxJkFSLJh2YY46VkkBJeVh";
let private_key = PrivateKey.fromWif(active_key);
let amount_to_sell = { amount: 100000, asset_id: 0 };
let min_to_receive = { amount: 10000, asset_id: 4 }
let expiration = Math.floor((new Date().getTime() + 10 * 24 * 3600 ) / 1000)
let fill_or_kill = false
let op_data = { seller, amount_to_sell, min_to_receive, expiration, fill_or_kill }

let transfer = async () => {
  let fees = await TransactionHelper.process_transaction('limit_order_create', op_data, seller);
  // console.log('get fees : ', fees);
  let result = await TransactionHelper.process_transaction('limit_order_create', op_data, seller, true, true, private_key, true)
  console.log('process result : ', result);
  process.exit(0);
}

Apis.instance("ws://192.168.0.202:8090", true)
  .init_promise.then((res) => {
    console.log("connected to:", res[0].network_name, "network");
    ChainStore.init().then(() => transfer());
  });


