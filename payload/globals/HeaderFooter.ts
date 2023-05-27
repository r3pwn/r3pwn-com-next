import { GlobalConfig } from "payload/types";
import { getSupportedIcons } from "../../utils/payload-icons";

const HeaderFooter: GlobalConfig = {
  slug: "header-footer",
  label: 'Header/Footer',
  typescript: {
    interface: 'HeaderFooterData'
  },
  fields: [
    {
      name: 'navigationLinks',
      type: 'array',
      label: 'Navigation Links',
      labels: {
        singular: 'Link',
        plural: 'Links',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true
        },
        {
          name: 'target',
          type: 'relationship',
          relationTo: 'page',
          required: true
        }
      ]
    },
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      labels: {
        singular: 'Link',
        plural: 'Links',
      },
      fields: [
        {
          name: 'ariaLabel',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
        },
        {
          name: 'icon',
          type: 'select',
          options: getSupportedIcons().map(iconName => ({
            label: `${iconName.charAt(0).toUpperCase()}${iconName.slice(1)}`,
            value: iconName
          }))
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          label: 'Open link in new tab',
          defaultValue: false
        }
      ]
    },
    {
      name: "copyrightText",
      type: "text"
    }
  ]
};

export default HeaderFooter;