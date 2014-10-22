<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc"
    xmlns:c="http://www.w3.org/ns/xproc-step" version="1.0">
   <p:output port="result"/>
   <p:option name="base"/>
   <p:load>
      <p:with-option name="href" select="concat($base,'plays.xhtml')"/>
   </p:load>
   <p:xquery>
      <p:input port="parameters"><p:empty/></p:input>
      <p:input port="query">
         <p:data wrapper="c:query" href="index.xq" content-type="text/plain"/>
      </p:input>
   </p:xquery>
</p:declare-step>