<tr>
  <td width="20" rowspan="?{{ desc 2 }}??{{ !desc 1 }}?" align="center" valign="middle" nowrap>!{{ index }}!</td>
  <td height="50" align="left" valign="middle" nowrap><a name="!{{ id }}!-params-!{{ param }}!"></a><strong>!{{ param }}!</strong></td>
  <td height="50" colspan="?{{ dflt 1 }}??{{ !dflt 2 }}?" align="left" valign="middle" nowrap><em><code>  !{{ type }}!  </code></em></td>
  ?{{ dflt
    <td height="50" align="left" valign="middle" nowrap>default: <code>!{{ dflt }}!</code></td>
  }}?
</tr>
?{{ desc
  <tr><td colspan="3" align="left" valign="middle"><br>!{{ desc }}!<br></td></tr>
}}?
