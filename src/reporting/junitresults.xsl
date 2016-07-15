<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">  

<xsl:template match="testsuites">
<html>
<body style="background-color:#004080">
  <h1 style="color:#ffffff;font-family:verdana;font-weight:300;text-align:center;"><i>RDS Test Runner Results</i></h1>
  <p style="color:#ffffff;font-family:verdana;font-weight:300;text-align:center;">Last Run -- <xsl:value-of select="testsuite/@timestamp"/> -- </p>

  <br></br>
  <br></br>
  <h2 style="color:#ffffff;font-family:verdana;font-weight:300;text-align:center;">Failures</h2>
  <table border="1" style="width:80%;" align="center" bgcolor="#ffffff">
    <tr height='50'>
      <th style="font-family:verdana;">Suite</th>
      <th style="font-family:verdana;">Test</th>
      <th style="font-family:verdana;">Reason</th>
    </tr>
    <xsl:for-each select="testsuite">
      <xsl:for-each select="testcase">
        <xsl:for-each select="failure">
          <tr height='40'>
            <td align='center'><xsl:value-of select="../@classname"/></td>
            <td align='center'><xsl:value-of select="../@name"/></td>
            <td align='center'><xsl:value-of select="@message"/></td>
          </tr>  
        </xsl:for-each>
      </xsl:for-each>
    </xsl:for-each>
  </table>
  <br></br>
  <h2 style="color:#ffffff;font-family:verdana;font-weight:300;text-align:center;">Exectuted</h2>
  <table border="1" style="width:50%;" align="center" bgcolor="#ffffff">
    <tr height='50'>
      <th style="font-family:verdana;">Suite</th>
      <th style="font-family:verdana;">Test</th>
      <th style="font-family:verdana;">Time</th>
    </tr>
    <xsl:for-each select="testsuite">
      <xsl:for-each select="testcase">
        <tr height='40'>
          <td align='center'><xsl:value-of select="@classname"/></td>
          <td align='center'><xsl:value-of select="@name"/></td>
          <td align='center'><xsl:value-of select="@time"/></td>
        </tr>
      </xsl:for-each>
    </xsl:for-each>
  </table>
  <br></br>
  <br></br>
  </body>
  </html>
</xsl:template>

</xsl:stylesheet>
