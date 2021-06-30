#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;

use std::convert::TryInto;

use napi::{CallContext, JsBoolean, JsNumber, JsObject, Result};

#[module_exports]
fn init(mut exports: JsObject) -> Result<()> {
  exports.create_named_method("default", is_even)?;
  Ok(())
}

#[js_function(1)]
fn is_even(ctx: CallContext) -> Result<JsBoolean> {
  let i: i32 = ctx.get::<JsNumber>(0)?.try_into()?;
  let result = i % 2 == 0;
  ctx.env.get_boolean(result)
}