<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc"
    xmlns:c="http://www.w3.org/ns/xproc-step" version="1.0">
   <p:output port="result"/>
   
   <p:import href="http://xmlcalabash.com/extension/steps/library-1.0.xpl"/>
   
   <p:directory-list path="shakespeare" include-filter=".*xml$"/>
   <p:viewport match="c:file" name="file">
      <p:output port="out">
         <p:pipe step="store" port="result"/>
      </p:output>
      <p:load>
         <p:with-option name="href" select="concat('shakespeare/',/c:file/@name)"/>
      </p:load>
      <p:namespace-rename from="" to="http://www.ibiblio.org/xml/examples/shakespeare/"/>
      <p:store name="store">
         <p:with-option name="href" select="concat('shakespeare/ns/',/c:file/@name)">
            <p:pipe port="current" step="file"/>
         </p:with-option>
      </p:store>
   </p:viewport>
</p:declare-step>