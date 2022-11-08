import $ from "jquery";
import _ from "lodash";
import { ui } from "./jquery.ui";

console.log(this);

ui();

const dom = $("div");
dom.html(_.join(["CH"]));
$("body").append(dom);
