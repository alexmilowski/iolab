<?xml version="1.0" encoding="UTF-8"?>
<p:declare-step xmlns:p="http://www.w3.org/ns/xproc"
    xmlns:c="http://www.w3.org/ns/xproc-step" version="1.0"
    xmlns:ml="http://xmlcalabash.com/ns/extensions/marklogic"
   >
   <p:option name='xdb.user'/>
   <p:option name='xdb.password'/>
   <p:option name='xdb.host'/>
   <p:option name='xdb.port'/>
   <p:output port="result"/>

   <p:import href="http://xmlcalabash.com/extension/steps/library-1.0.xpl"/>
   
   <p:directory-list path="shakespeare" include-filter=".*xml$"/>
   <p:viewport match="c:file">
      <p:output port="out">
         <p:pipe step="insert" port="result"/>
      </p:output>
      <p:variable name="url" select="concat('http://www.ibiblio.org/xml/examples/shakespeare/',/c:file/@name)"/>
      <p:load>
         <p:with-option name="href" select="concat('shakespeare/',/c:file/@name)"/>
      </p:load>
      <ml:insert-document name="insert">
         <p:with-option name='user' select='$xdb.user'/>
         <p:with-option name='password' select='$xdb.password'/>
         <p:with-option name='host' select='$xdb.host'/>
         <p:with-option name='port' select='$xdb.port'/>
         <p:with-option name="uri" select="$url"/>
         <p:with-option name="collections" select="'http://www.ibiblio.org/xml/examples/shakespeare/'"/>
      </ml:insert-document>
   </p:viewport>
</p:declare-step>